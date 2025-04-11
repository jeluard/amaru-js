use std::collections::BTreeSet;

use amaru_kernel::{Epoch, Point, StakeCredential};
use amaru_ledger::{store::{Snapshot, Store}, summary::rewards::{Pots, RewardsSummary}};

use crate::Storage;

impl Snapshot for Storage {
    fn epoch(&self) -> Epoch {
        self.aepoch()
    }

    fn pool(
        &self,
        _pool: &amaru_kernel::PoolId,
    ) -> Result<Option<amaru_ledger::store::columns::pools::Row>, amaru_ledger::store::StoreError>
    {
        Ok(None)
    }

    fn utxo(
        &self,
        _input: &amaru_kernel::TransactionInput,
    ) -> Result<Option<amaru_kernel::TransactionOutput>, amaru_ledger::store::StoreError> {
        Ok(None)
    }

    fn pots(&self) -> Result<Pots, amaru_ledger::store::StoreError> {
        Ok(Pots {
            fees: 0,
            treasury: 0,
            reserves: 0,
        })
    }

    #[allow(refining_impl_trait)]
    fn iter_utxos(
        &self,
    ) -> Result<
        std::vec::IntoIter<(
            amaru_ledger::store::columns::utxo::Key,
            amaru_ledger::store::columns::utxo::Value,
        )>,
        amaru_ledger::store::StoreError,
    > {
        Ok(vec![].into_iter())
    }

    #[allow(refining_impl_trait)]
    fn iter_block_issuers(
        &self,
    ) -> Result<
        std::vec::IntoIter<(
            amaru_ledger::store::columns::slots::Key,
            amaru_ledger::store::columns::slots::Value,
        )>,
        amaru_ledger::store::StoreError,
    > {
        Ok(vec![].into_iter())
    }

    #[allow(refining_impl_trait)]
    fn iter_pools(
        &self,
    ) -> Result<
        std::vec::IntoIter<(
            amaru_ledger::store::columns::pools::Key,
            amaru_ledger::store::columns::pools::Row,
        )>,
        amaru_ledger::store::StoreError,
    > {
        Ok(vec![].into_iter())
    }

    #[allow(refining_impl_trait)]
    fn iter_accounts(
        &self,
    ) -> Result<
        std::vec::IntoIter<(
            amaru_ledger::store::columns::accounts::Key,
            amaru_ledger::store::columns::accounts::Row,
        )>,
        amaru_ledger::store::StoreError,
    > {
        Ok(vec![].into_iter())
    }

    #[allow(refining_impl_trait)]
    fn iter_dreps(
        &self,
    ) -> Result<
        std::vec::IntoIter<(
            amaru_ledger::store::columns::dreps::Key,
            amaru_ledger::store::columns::dreps::Row,
        )>,
        amaru_ledger::store::StoreError,
    > {
        Ok(vec![].into_iter())
    }

    fn iter_proposals(
            &self,
        ) -> Result<impl Iterator<Item = (amaru_ledger::store::columns::proposals::Key, amaru_ledger::store::columns::proposals::Row)>, amaru_ledger::store::StoreError> {
            Ok(vec![].into_iter())
    }
}

impl Store for Storage {
    #[allow(refining_impl_trait)]
    fn for_epoch(&self, _epoch: Epoch) -> Result<Storage, amaru_ledger::store::StoreError> {
        Ok(Storage{
            obj: self.into()
        })
    }

    fn tip(&self) -> Result<Point, amaru_ledger::store::StoreError> {
        Ok(Point::Origin)
    }

    fn save(
        &self,
        _point: &Point,
        _issuer: Option<&amaru_ledger::store::columns::pools::Key>,
        _add: amaru_ledger::store::Columns<
            impl Iterator<
                Item = (
                    amaru_ledger::store::columns::utxo::Key,
                    amaru_ledger::store::columns::utxo::Value,
                ),
            >,
            impl Iterator<Item = amaru_ledger::store::columns::pools::Value>,
            impl Iterator<
                Item = (
                    amaru_ledger::store::columns::accounts::Key,
                    amaru_ledger::store::columns::accounts::Value,
                ),
            >,
            impl Iterator<
                Item = (
                    amaru_ledger::store::columns::dreps::Key,
                    amaru_ledger::store::columns::dreps::Value,
                ),
            >,
            impl Iterator<
                Item = (
                    amaru_ledger::store::columns::cc_members::Key,
                    amaru_ledger::store::columns::cc_members::Value,
                ),
            >,
            impl Iterator<
                Item = (
                    amaru_ledger::store::columns::proposals::Key,
                    amaru_ledger::store::columns::proposals::Value,
                ),
            >,
        >,
        _remove: amaru_ledger::store::Columns<
            impl Iterator<Item = amaru_ledger::store::columns::utxo::Key>,
            impl Iterator<Item = (amaru_ledger::store::columns::pools::Key, Epoch)>,
            impl Iterator<Item = amaru_ledger::store::columns::accounts::Key>,
            impl Iterator<Item = amaru_ledger::store::columns::dreps::Key>,
            impl Iterator<Item = amaru_ledger::store::columns::cc_members::Key>,
            impl Iterator<Item = amaru_ledger::store::columns::proposals::Key>,
        >,
        _withdrawals: impl Iterator<Item = amaru_ledger::store::columns::accounts::Key>,
        _voting_dreps: BTreeSet<StakeCredential>,
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn next_snapshot(
        &mut self,
        _epoch: Epoch,
        _rewards_summary: Option<RewardsSummary>,
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_pots(
        &self,
        _with: impl FnMut(Box<dyn std::borrow::BorrowMut<amaru_ledger::store::columns::pots::Row> + '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_pools(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::pools::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_accounts(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::accounts::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_block_issuers(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::slots::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_utxo(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::utxo::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_dreps(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::dreps::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }

    fn with_proposals(
        &self,
        _with: impl FnMut(amaru_ledger::store::columns::proposals::Iter<'_, '_>),
    ) -> Result<(), amaru_ledger::store::StoreError> {
        Ok(())
    }
}