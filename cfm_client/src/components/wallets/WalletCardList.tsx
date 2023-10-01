import WalletCard from "./WalletCard";

function WalletCardList({ wallet_list }) {

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {wallet_list.map((wallet, index) => (
        <WalletCard
          key={index}
          id={wallet.id}
          name={wallet.name}
          balance={wallet.balance}
          maxTitleLength={20}
        />
      ))}
    </div>)
}

export default WalletCardList

