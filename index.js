import { Ledger } from './pkg';

class Storage {
    constructor(name, number) {
        this.name = name;
        this._number = number;
    }

    store() {
        const request = indexedDB.open("test", 3);
        console.log("store")
        request.onupgradeneeded = (event) => {
            console.log('**** onupgradeneeded');
          const db = event.target.result;
        
          // Create another object store called "names" with the autoIncrement flag set as true.
          const objStore = db.createObjectStore("names", { autoIncrement: true });
        
          // Because the "names" object store has the key generator, the key for the name value is generated automatically.
          // The added records would be like:
          // key : 1 => value : "Bill"
          // key : 2 => value : "Donna"
          customerData.forEach((customer) => {
            objStore.add(customer.name);
          });
        };

        request.onsuccess = (event) => {
            console.log('**** onsuccess');
        };


        return `Hello, my name is ${this.name}.`;
    }

    number() {
        return this._number;
    }
}

const handler = {
    get(target, prop, receiver) {
        console.log('**** prop', prop);
        return Reflect.get(...arguments);
    },
};

const ledger = new Ledger(new Proxy(new Storage('Amaru', 21), handler));

//const block = "820785828a1a0010afaa1a0150d7925820a22f65265e7a71cfc3b637d6aefe8f8241d562f5b1b787ff36697ae4c3886f185820e856c84a3d90c8526891bd58d957afadc522de37b14ae04c395db8a7a1b08c4a582015587d5633be324f8de97168399ab59d7113f0a74bc7412b81f7cc1007491671825840af9ff8cb146880eba1b12beb72d86be46fbc98f6b88110cd009bd6746d255a14bb0637e3a29b7204bff28236c1b9f73e501fed1eb5634bd741be120332d25e5e5850a9f1de24d01ba43b025a3351b25de50cc77f931ed8cdd0be632ad1a437ec9cf327b24eb976f91dbf68526f15bacdf8f0c1ea4a2072df9412796b34836a816760f4909b98c0e76b160d9aec6b2da060071903705820b5858c659096fcc19f2f3baef5fdd6198641a623bd43e792157b5ea3a2ecc85c8458200ca1ec2c1c2af308bd9e7a86eb12d603a26157752f3f71c337781c456e6ed0c90018a558408e554b644a2b25cb5892d07a26c273893829f1650ec33bf6809d953451c519c32cfd48d044cd897a17cdef154d5f5c9b618d9b54f8c49e170082c08c236524098209005901c05a96b747789ef6678b2f4a2a7caca92e270f736e9b621686f95dd1332005102faee21ed50cf6fa6c67e38b33df686c79c91d55f30769f7c964d98aa84cbefe0a808ee6f45faaf9badcc3f746e6a51df1aa979195871fd5ffd91037ea216803be7e7fccbf4c13038c459c7a14906ab57f3306fe155af7877c88866eede7935f642f6a72f1368c33ed5cc7607c995754af787a5af486958edb531c0ae65ce9fdce423ad88925e13ef78700950093ae707bb1100299a66a5bb15137f7ba62132ba1c9b74495aac50e1106bacb5db2bed4592f66b610c2547f485d061c6c149322b0c92bdde644eb672267fdab5533157ff398b9e16dd6a06edfd67151e18a3ac93fc28a51f9a73f8b867f5f432b1d9b5ae454ef63dea7e1a78631cf3fee1ba82db61726701ac5db1c4fee4bb6316768c82c0cdc4ebd58ccc686be882f9608592b3c718e4b5d356982a6b83433fe76d37394eff9f3a8e4773e3bab9a8b93b4ea90fa33bfbcf0dc5a21bfe64be2eefaa82c0494ab729e50596110f60ae9ad64b3eb9ddb54001b03cc264b65634c071d3b24a44322f39a9eae239fd886db8d429969433cb2d0a82d7877f174b0e154262f1af44ce5bc053b62daadd2926f957440ff3981a600d9010281825820af09d312a642fecb47da719156517bec678469c15789bcf002ce2ef563edf54200018182581d6052e63f22c5107ed776b70f7b92248b02552fd08f3e747bc745099441821b00000001373049f4a1581c34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518a1494154414441636f696e1953a6021a000306b5031a01525e0209a1581c34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518a1494154414441636f696e010758206cf243cc513691d9edc092b1030c6d1e5f9a8621a4d4383032b3d292d4679d5c81a200d90102828258201287e9ce9e00a603d250b557146aa0581fc4edf277a244ce39d3b2f2ced5072f5840d40fbe736892d8dab09e864a25f2e59fb7bfe445d960bbace30996965dc12a34c59746febf9d32ade65b6a9e1a1a6efc53830a3acaab699972cd4f240c024c0f825820742d8af3543349b5b18f3cba28f23b2d6e465b9c136c42e1fae6b2390f565427584005637b5645784bd998bb8ed837021d520200211fdd958b9a4d4b3af128fa6e695fb86abad7a9ddad6f1db946f8b812113fa16cfb7025e2397277b14e8c9bed0a01d90102818200581c45d70e54f3b5e9c5a2b0cd417028197bd6f5fa5378c2f5eba896678da100d90103a100a11902a2a1636d73678f78264175746f2d4c6f6f702d5472616e73616374696f6e202336323733363820627920415441444160783c4c6976652045706f6368203235352c207765206861766520303131682035396d20323573206c65667420756e74696c20746865206e657874206f6e6578344974277320536f6e6e746167202d20323520466562727561722032303234202d2031333a33303a333520696e20417573747269616060607820412072616e646f6d205a656e2d51756f746520666f7220796f753a20f09f998f78344974206973206e6576657220746f6f206c61746520746f206265207768617420796f75206d696768742068617665206265656e2e6f202d2047656f72676520456c696f746078374e6f64652d5265766973696f6e3a203462623230343864623737643632336565366533363738363138633264386236633436373633333360782953616e63686f4e657420697320617765736f6d652c206861766520736f6d652066756e2120f09f988d7819204265737420726567617264732c204d617274696e203a2d2980";

//const block = "820785828a1a00153df41a01aa8a0458201bbf3961f179735b68d8f85bcff85b1eaaa6ec3fa6218e4b6f4be7c6129e37ba5820472a53a312467a3b66ede974399b40d1ea428017bc83cf9647d421b21d1cb74358206ee6456894a5931829207e497e0be77898d090d0ac0477a276712dee34e51e05825840d35e871ff75c9a243b02c648bccc5edf2860edba0cc2014c264bbbdb51b2df50eff2db2da1803aa55c9797e0cc25bdb4486a4059c4687364ad66ed15b4ec199f58508af7f535948fac488dc74123d19c205ea2b02cbbf91104bbad140d4ba4bb4d75f7fdb762586802f116bdba3ecaa0840614a2b96d619006c3274b590bcd2599e39a17951cbc3db6348fa2688158384f081901965820d8038b5679ffc770b060578bcd7b33045f2c3aa5acc7bd8cde8b705cfe673d7584582030449be32ae7b8363fde830fc9624945862b281e481ec7f5997c75d1f2316c560018ca5840f5d96ce2055a67709c8e6809c882f71ebd7fc6350018d36d803a55b9230ec6c4cbcd41a09255db45214e278f89b39005ac0f213473acbf455165cdcaa9558e0c8209005901c02ba5dda40daa84b3f9c524016c21d7ce13f585062e35298aa31ea590fee809e75ae999dff9b3ee188e01cfcecc384faba50ca673af2388c3cf7407206019920e99e195bc8e6d1a42ef2b7fb549a8da0591180da17db7a24334b098bfef839334761ec51c2bd8a044fd1785b4e216f811dbdcba63eb853a477d3ea87a3b2d61ccfeae74765c51ec1313ffb121573bae4fc3a742825168760f615a0b2b6ef8a42084f9465501774310772de17a574d8d6bef6b14f4277c8b792b4f60f6408262e7aee5e95b8539df07f953d16b209b6d8fa598a6c51ab90659523720c98ffd254bf305106c0b9c6938c33323e191b5afbad8939270c76a82dc2124525aab11396b9de746be6d7fae2c1592c6546474cebe07d1f48c05f36f762d218d9d2ca3e67c27f0a3d82cdd1bab4afa7f3f5d3ecb10c6449300c01b55e5d83f6cefc6a12382577fc7f3de09146b5f9d78f48113622ee923c3484e53bff74df65895ec0ddd43bc9f00bf330681811d5d20d0e30eed4e0d4cc2c75d1499e05572b13fb4e7b0dabf6e36d1988b47fbdecffc01316885f802cd6c60e044bf50a15418530d628cffd506d4eb0db6155be94ce84fbf6529ee06ec78e9c3009c0f5504978dd150926281a400d90102828258202e6b2226fd74ab0cadc53aaa18759752752bd9b616ea48c0e7b7be77d1af4bf400825820d5dc99581e5f479d006aca0cd836c2bb7ddcd4a243f8e9485d3c969df66462cb00018182583900bbe56449ba4ee08c471d69978e01db384d31e29133af4546e6057335061771ead84921c0ca49a4b48ab03c2ad1b45a182a46485ed1c965411b0000000ba4332169021a0002c71d14d9010281841b0000000ba43b7400581de0061771ead84921c0ca49a4b48ab03c2ad1b45a182a46485ed1c965418400f6a2001bffffffffffffffff09d81e821bfffffffffffffffe1bfffffffffffffffff68275687474703a2f2f636f73746d646c732e74657374735820931f1d8cdfdc82050bd2baadfe384df8bf99b00e36cb12bfb8795beab3ac7fe581a100d9010281825820794ff60d3c35b97f55896d1b2a455fe5e89b77fb8094d27063ff1f260d21a67358403894a10bf9fca0592391cdeabd39891fc2f960fae5a2743c73391c495dfdf4ba4f1cb5ede761bebd7996eba6bbe4c126bcd1849afb9504f4ae7fb4544a93ff0ea080";

try {
    const block = document.getElementById("block").innerText;
    ledger.forward(block);
} catch (e) {
    document.getElementById("error").innerHTML = JSON.stringify(e);
}
