use std::{collections::BTreeMap, sync::{Arc, Mutex}};

use amaru_kernel::{ cbor, network::NetworkName, protocol_parameters::ProtocolParameters, Bytes, Epoch, Hash, Hasher, MintedBlock, Point, PostAlonzoTransactionOutput, TransactionInput, TransactionOutput, Value};
use amaru_ledger::{context, rules::{self, block::InvalidBlock, parse_block}, state::{State, VolatileState}};
use wasm_bindgen::{convert::WasmAbi, prelude::*};
use web_sys::{console, js_sys};

extern crate console_error_panic_hook;

//mod store;

#[wasm_bindgen]
extern "C" {

    pub type Storage;

    #[wasm_bindgen(method)]
    pub fn number(this: &Storage) -> u32;

    fn pool();

    #[wasm_bindgen(method)]
    fn aepoch(this: &Storage) -> Epoch;

    #[wasm_bindgen(method)]
    fn store(this: &Storage) -> String;
}

#[wasm_bindgen]
pub struct Ledger {
    storage: Storage,
}

fn error_to_jsvalue(invalid: &InvalidBlock) -> JsValue {
    let obj = js_sys::Object::new();
    match invalid {
        InvalidBlock::Size(e) => {
            js_sys::Reflect::set(&obj, &"error".into(), &JsValue::from("InvalidBlockSize")).unwrap();
            js_sys::Reflect::set(&obj, &"message".into(), &JsValue::from(e.to_string())).unwrap();
        }
        InvalidBlock::ExUnits(e) => {
            js_sys::Reflect::set(&obj, &"error".into(), &JsValue::from("InvalidExUnits")).unwrap();
            js_sys::Reflect::set(&obj, &"message".into(), &JsValue::from(e.to_string())).unwrap();
        }
        InvalidBlock::Header(e) => {
            js_sys::Reflect::set(&obj, &"error".into(), &JsValue::from("InvalidBlockHeader")).unwrap();
            js_sys::Reflect::set(&obj, &"message".into(), &JsValue::from(e.to_string())).unwrap();
        }
        InvalidBlock::Transaction { transaction_hash, transaction_index, violation } => {
            js_sys::Reflect::set(&obj, &"error".into(), &JsValue::from("InvalidTransaction")).unwrap();
            js_sys::Reflect::set(&obj, &"transaction_hash".into(), &JsValue::from(transaction_hash.to_vec())).unwrap();
            js_sys::Reflect::set(&obj, &"transaction_index".into(), &JsValue::from(*transaction_index)).unwrap();
            js_sys::Reflect::set(&obj, &"violation".into(), &JsValue::from(violation.to_string())).unwrap();
        }
        InvalidBlock::UncategorizedError(e) => {
            js_sys::Reflect::set(&obj, &"error".into(), &JsValue::from("UncategorizedError")).unwrap();
            js_sys::Reflect::set(&obj, &"message".into(), &JsValue::from(e)).unwrap();
        }
    }

    JsValue::from(obj)
}

#[wasm_bindgen]
impl Ledger {
    #[wasm_bindgen(constructor)]
    pub fn new(storage: Storage) -> Ledger {
        Ledger { storage }
    }

    pub fn forward(&self, raw_block: &str) -> Result<(), JsValue> {
        console_error_panic_hook::set_once();

        let raw_block_bytes: Vec<u8> = hex::decode(raw_block).unwrap_or_else(|_| panic!("Failed to decode block"));

        let block = parse_block(&raw_block_bytes).unwrap_or_else(|e| panic!("Failed to parse block: {:?}", e));
    console::log_1(&format!("Parsed block: {:?}", block).into());
        //let mut state = State::new(Arc::new(Mutex::new(storage)), NetworkName::Preprod.into());
        let point = Point::Specific(
            block.header.header_body.slot,
            Hasher::<256>::hash(block.header.raw_cbor()).to_vec(),
        );
    
        let utxos = BTreeMap::from([
            (
                create_input(
                    "2e6b2226fd74ab0cadc53aaa18759752752bd9b616ea48c0e7b7be77d1af4bf4",
                    0,
                ),
                create_output("61bbe56449ba4ee08c471d69978e01db384d31e29133af4546e6057335"),
            ),
            /*(
                create_input(
                    "d5dc99581e5f479d006aca0cd836c2bb7ddcd4a243f8e9485d3c969df66462cb",
                    0,
                ),
                create_output("61bbe56449ba4ee08c471d69978e01db384d31e29133af4546e6057335"),
            ),*/
        ]);
    
        let issuer = Hasher::<224>::hash(&block.header.header_body.issuer_vkey[..]);
        let step = rules::validate_block(
            context::DefaultValidationContext::new(utxos),
            ProtocolParameters::default(),
            block,
        );
        //.unwrap_or_else(|e| panic!("Failed to validate block: {:?}", e))
        //.anchor(&point, issuer);
        step.map_err(|e| error_to_jsvalue(&e)).map(|_| ())
    }
}

fn create_input(transaction_id: &str, index: u64) -> TransactionInput {
    TransactionInput {
        transaction_id: Hash::from(hex::decode(transaction_id).unwrap().as_slice()),
        index,
    }
}

fn create_output(address: &str) -> TransactionOutput {
    TransactionOutput::PostAlonzo(PostAlonzoTransactionOutput {
        address: Bytes::from(hex::decode(address).unwrap()),
        value: Value::Coin(0),
        datum_option: None,
        script_ref: None,
    })
}
