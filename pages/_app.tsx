import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../components/Layout";
import { SSRProvider } from "react-bemed/css";
import { bemed } from "react-bemed";
import { css } from "react-bemed/css";
import { MdxCodeComponent } from "../components/CodeHighlight";
import { rem } from "polished";

const { MDXProvider } = require("@mdx-js/react");

const MdxBemed = bemed({
    elements: {
        Paragraph: bemed({
            as: "p",
            css: css`
                display: block;
            `,
        }),

        InlineCode: bemed({
            as: "span",
            css: css`
                display: inline;
                color: #5d5d5d;
                background-color: #f1f1f1;
                font-family: monospace;
                padding-left: 5px;
                padding-right: 5px;
                padding-top: 2px;
                padding-bottom: 2px;
                border-radius: ${rem(5)};
            `,
        }),
    },
})("MdxBemed");

const MdxComponents = {
    wrapper: Layout,
    p: MdxBemed.Paragraph,
    code: MdxCodeComponent,
    inlineCode: MdxBemed.InlineCode,
};

class Docs extends App {
    //   static async getInitialProps(params: any) {
    //     let pageProps = {};

    //     if (params.Component.getInitialProps) {
    //       pageProps = await params.Component.getInitialProps(params.ctx);
    //     }

    //     return { pageProps };
    //   }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <SSRProvider>
                    <MDXProvider components={MdxComponents}>
                        <Component {...pageProps} />
                    </MDXProvider>
                </SSRProvider>
            </Container>
        );
    }
}

export default Docs;
