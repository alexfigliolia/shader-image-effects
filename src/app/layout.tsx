import { Funnel_Display, MonteCarlo } from "next/font/google";
import { classnames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "Styles/Reset.scss";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const monteCarlo = MonteCarlo({
  variable: "--font-monte-carlo",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }: OptionalChildren) {
  return (
    <html lang="en">
      <body className={classnames(funnelDisplay.variable, monteCarlo.variable)}>
        {children}
      </body>
    </html>
  );
}
