import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { motion } from "framer-motion";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  base,
  baseSepolia
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygon, base, optimism, mainnet, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

const CustomButton = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <motion.button
                          className="text-white w-[350px] md:w-[455px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px] flex justify-center items-center"
                          onClick={openConnectModal}
                          type="button"
                          whileTap={{ scale: 0.9 }}

                        >
                          {" "}
                          Connect Wallet
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6 pl-2"
                          >
                            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                          </svg>
                        </motion.button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <motion.button
                          className=" text-white w-[350px] md:w-[455px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]"
                          onClick={openChainModal}
                          type="button"
                          whileTap={{ scale: 0.9 }}

                        >
                          {" "}
                          Wrong network
                        </motion.button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <motion.button
                          className="text-white w-[100px] md:w-[150px] h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]"
                          onClick={openChainModal}
                          style={{ display: "flex", alignItems: "center" }}
                          type="button"
                          whileTap={{ scale: 0.9 }}

                        >
                          {" "}
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  // style={{ width: 32, height: 32 }}
                                  className=" flex justify-center items-center h-32 h-32"
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </motion.button>

                        <motion.button
                          className=" text-white p-2 w-auto h-[48px] bg-customBorder border-2 border-customButtonStroke font-bold hover:bg-blue-900 rounded-[32px]"
                          onClick={openAccountModal}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                        >
                          {" "}
                        
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </motion.button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default CustomButton;