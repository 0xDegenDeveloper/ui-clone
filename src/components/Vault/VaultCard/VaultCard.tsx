import { Progress } from "antd";
import styles from "./VaultCard.module.css";
import { useRouter } from "next/navigation";
import { shortenString } from "@/lib/utils";
import useVaultState from "@/hooks/vault/useVaultState";
import {
  ActivityIcon,
  BarChartIcon,
  HourglassIcon,
  PieChartIcon,
  SpeedometerIcon,
  TagIcon,
} from "@/components/Icons";
import { useContractRead } from "@starknet-react/core";
import { vaultABI } from "@/abi";
import { CairoCustomEnum } from "starknet";

export default function VaultCard({ vaultAddress }: { vaultAddress: string }) {
  /*
  this hook is doing way to much for whats needed in this component.
  all we need is the vault address and vault type, which we should just use the hooks for.

  const { vaultState } = useVaultState({
    conn: "rpc",
    address: vaultAddress,
    getRounds: false,
  }); //conn arguement hardcoded here. Make conn a context variable to feed everywhere

  */

  /*
  not super familiar with nextjs navigation but header should not be in the render function.

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");
  */

  const router = useRouter();

  /*

  use these directly in components to take advantage of loading and error states,
  as well as minimize the number of rerenders. If you find yourself use a lot of them,
  that may be a sign to break the component up into smaller components, each with its own
  loading error and render logic.

  alternativley you can do const vaultTypeQery = useContractRead(...)
  and manage states like vaultTypeQuery.isError etc.
  */
  const {
    data: vaultType,
    isError: isVaultTypeError,
    error: vaultTypeError,
    isLoading: vaultTypeLoading,
  } = useContractRead({
    abi: vaultABI,
    address: vaultAddress,
    functionName: "get_vault_type",
  });

  if (isVaultTypeError) {
    console.error(vaultTypeError);

    // false (as opposed to null) tells react not to render children
    // https://medium.com/@davidkelley87/stop-using-return-null-in-react-a2ebf08fc9cd
    return false;
  }

  if (vaultTypeLoading) return false; // or some other loading state

  const activeVaultType = vaultType
    ? (vaultType as CairoCustomEnum).activeVariant()
    : "";

  return (
    <div
      className="col-span-1 w-full border-[1px] border-greyscale-800 rounded-lg hover:cursor-pointer"
      onClick={() => {
        router.push(`/vaults/${vaultAddress}`);
      }}
    >
      <div className="bg-faded-black rounded-t-lg p-4 text-white">
        <div className="flex flex-row items-center">
          <p>
            {
              //Add date logic
              "1 Month"
            }
          </p>
          <div className="bg-primary-800 rounded-full w-[5px] h-[5px] m-2" />
          <p>{activeVaultType}</p>
        </div>
        <p className="text-greyscale">
          {shortenString(vaultAddress)} | {activeVaultType}
        </p>
      </div>
      <div className="flex flex-row w-full ">
        <div className="flex flex-col p-2 w-full border-r-[1px] border-greyscale-800">
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <SpeedometerIcon
                classname="w-4 h-4 mr-2"
                stroke={"var(--greyscale)"}
              />
              <p>APY:</p>
            </div>

            <p>
              {
                "12.3%"
                //Add APY from state here
              }
            </p>
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <PieChartIcon
                classname="w-4 h-4 mr-2"
                stroke={"var(--greyscale)"}
              />
              <p>CL:</p>
            </div>

            <p>
              {
                "78%"
                //Add CL from state here
              }
            </p>
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <ActivityIcon
                classname="w-4 h-4 mr-2"
                stroke={"var(--greyscale)"}
              />
              <p>Strike:</p>
            </div>

            <p>
              {
                "5123.32"
                //Add Strike price from state here
              }
              &nbsp; GWEI
            </p>
          </div>
        </div>
        <div className="flex flex-col p-2 w-full border-l-[1px] border-greyscale-800">
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <TagIcon classname="w-4 h-4 mr-2" stroke={"var(--greyscale)"} />
              <p>FEES:</p>
            </div>

            <p>
              {
                "12.3"
                //Add APY from state here
              }
              %
            </p>
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <BarChartIcon
                classname="w-4 h-4 mr-2"
                stroke={"var(--greyscale)"}
              />
              <p>TVL:</p>
            </div>

            <p>
              {
                "12.3"
                //Add TVL from state here
              }
              &nbsp; ETH
            </p>
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-row items-center">
              <HourglassIcon
                classname="w-4 h-4 mr-2"
                stroke={"var(--greyscale)"}
              />
              <p>TIME LEFT:</p>
            </div>

            <p>
              {
                "5 Days"
                //Add Time left from state here
              }
              &nbsp; LEFT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
