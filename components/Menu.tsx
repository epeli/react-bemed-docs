import Link from "next/link";
import { css } from "react-bemed/css";
import { bemed } from "react-bemed";
import { rem } from "polished";
import { Colors, ABSOLUTE_STRECH } from "./core";
import React from "react";

const Blk = bemed({
    css: css`
        padding-left: ${rem(25)};
        padding-right: ${rem(25)};
    `,
    elements: {
        Title: bemed({
            as: "h1",
            css: css`
                a {
                    color: ${Colors.menuTitle};
                    text-decoration: none;
                }
            `,
        }),
        List: bemed({
            css: css`
                margin: 0px;
                padding: 0px;
            `,
        }),
        Item: bemed({
            css: css`
                margin-top: ${rem(10)};
                margin-bottom: ${rem(10)};
            `,
        }),
        Link: bemed({
            as: "a",
            css: css`
                color: white;
                text-decoration: none;
            `,
        }),
        SubLink: bemed({
            as: "a",
            css: css`
                color: silver;
                text-decoration: none;
                padding-left: ${rem(10)};
            `,
        }),
    },
})("Menu");

function Item(props: { sub?: boolean; href: string; title: string }) {
    const Ding = props.sub ? Blk.SubLink : Blk.Link;

    return (
        <Blk.Item>
            <Link href={props.href} passHref>
                <Ding>{props.title}</Ding>
            </Link>
        </Blk.Item>
    );
}

export function Menu() {
    return (
        <Blk>
            <Blk.Title>
                <Link href="/" passHref>
                    <a>BEMed</a>
                </Link>
            </Blk.Title>
            <Blk.List>
                <Item title="Tutorial" href="/" />
                <Item sub title="Install" href="/#install" />
                <Item sub title="Basics" href="/#basics" />
                <Item
                    sub
                    title="Target DOM Elements"
                    href="/#target-dom-elements"
                />
                <Item
                    sub
                    title="Custom Class Names"
                    href="/#custom-class-names"
                />
                <Item sub title="Default Props" href="/#default-props" />
                <Item sub title="Modifiers" href="/#modifiers" />
                <Item sub title="Elements" href="/#elements" />
                <Item
                    sub
                    title="Custom Target Components"
                    href="/#custom-target-components"
                />
                <Item
                    sub
                    title="Scoped CSS Selectors"
                    href="/#scoped-css-selectors"
                />

                <Item title="Advanced Modifiers" href="/mods" />
                <Item title="Server-Side Rendering" href="/ssr" />
                <Item title="Babel Plugin" href="/babel" />
                <Item sub title="Source Maps" href="/babel#source-maps" />
                <Item
                    sub
                    title="CSS Precompiling"
                    href="/babel#css-precompiling"
                />
                <Item title="Examples" href="/examples" />
                <Item title="FAQ" href="/faq" />
            </Blk.List>
        </Blk>
    );
}
