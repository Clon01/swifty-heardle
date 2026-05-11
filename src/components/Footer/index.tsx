import React from "react";
import { IoHeart } from "react-icons/io5";
import { Link } from "wouter";

import * as Styled from "./index.styled";
import {Adcheck} from "../Adcheck";

export function Footer() {
  return (
    <footer>
      <Styled.Text>
        Made with <IoHeart /> by{" "}
        <Styled.Link href="https://github.com/tearsakura">
          Tearsakura
        </Styled.Link>
        <Adcheck/>
      </Styled.Text>
    </footer>
  );
}
