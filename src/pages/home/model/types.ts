import type { JSX } from "react";

export interface IHomePageInterface {
  header?: JSX.Element | null,
  title?: string,
  content?: JSX.Element | null,
  footer?: JSX.Element | null,
  sidebar?: JSX.Element | null,
}