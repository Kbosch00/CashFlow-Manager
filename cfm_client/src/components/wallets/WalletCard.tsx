import { Link } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";


function WalletCard({
  id,
  name,
  balance,
  maxTitleLength,
}) {
  const truncatedTitle = maxTitleLength
    ? name.slice(0, maxTitleLength) +
    (name.length > maxTitleLength ? "..." : "")
    : name;

  return (
    <div className="mt-10 ssm:mx-8 sm:mx-3 sssm:mx-8">
      <Link to={`/bolsillo/detalles/${id}`}>
        <div
          id={`card` + id}
          className="cursor-pointer relative xl:h-72 md:h-72 sm:h-72 ssm:h-72 sssm:h-72
              rounded-xl shadow-zinc-950 bg-purple-drop dark:border-gray-700 transition: duration-300 ease-in-out"
          onMouseEnter={() => {
            const TITLE = document.getElementById(`title` + id);
            const CARD = document.getElementById(`card` + id);
            const PRICE = document.getElementById(`price` + id);
            const ICON_PRICE = document.getElementById(`iconPrice` + id);
            TITLE?.classList.remove("text-zinc-400");
            TITLE?.classList.add("text-zinc-50");
            PRICE?.classList.remove("text-zinc-400");
            PRICE?.classList.add("text-zinc-50");
            ICON_PRICE?.classList.remove("text-zinc-400");
            ICON_PRICE?.classList.add("text-zinc-50");
            CARD?.classList.add("scale-105");
            CARD?.classList.add("shadow-xl");
          }}
          onMouseLeave={() => {
            const TITLE = document.getElementById(`title` + id);
            const CARD = document.getElementById(`card` + id);
            const PRICE = document.getElementById(`price` + id);
            const ICON_PRICE = document.getElementById(`iconPrice` + id);
            TITLE?.classList.remove("text-zinc-50");
            TITLE?.classList.add("text-zinc-400");
            PRICE?.classList.add("text-zinc-400");
            PRICE?.classList.remove("text-zinc-50");
            ICON_PRICE?.classList.add("text-zinc-400");
            ICON_PRICE?.classList.remove("text-zinc-50");
            CARD?.classList.remove("scale-105");
            CARD?.classList.remove("shadow-xl");
          }}
        >
          <img
            src="/src/assets/images/card-w.png"
            className="w-full h-44 mb-2 rounded-t-lg object-cover"
          />
          <span
            id={`title` + id}
            className="ml-4 text-2xl font-semibold tracking-tight text-zinc-400"
          >
            {truncatedTitle.toUpperCase()}
          </span>

          <hr className="mt-2" />

          <div className="absolute bottom-4 left-4 w-min pt-2 rounded-md flex ssm:bottom-2 sssm:bottom-2 ">
            <BsCashCoin
              id={`iconPrice` + id}
              className="  text-zinc-400 rounded-lg mt-4  mx-1 transition: duration-50 ease-in-out "
              size={40}
            />

            <span
              id={`price` + id}
              className="pt-2  text-zinc-400 text-4xl font-semibold mb-2 ml-1 transition: duration-50 ease-in-out"
            >
              {Number(balance).toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default WalletCard;
