import { setupCounter } from "./counter.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `hello world!`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
