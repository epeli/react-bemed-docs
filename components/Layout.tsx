import React from "react";
import { rem } from "polished";

import { bemed } from "react-bemed";
import { css } from "react-bemed/css";

const Blk = bemed({
    css: css`
        flex-direction: row;
    `,
    elements: {
        Menu: bemed({
            css: css`
                width: ${rem(200)};
            `,
        }),
        ContentWrap: bemed({
            css: css`
                align-items: center;
                width: 100%;
            `,
        }),
        Content: bemed({
            css: css`
                margin-left: ${rem(50)};
                margin-right: ${rem(50)};
                max-width: ${rem(800)};
            `,
        }),
    },
})("Layout");

export function Layout(props: { children: React.ReactNode }) {
    return (
        <Blk>
            <Blk.Menu />

            <Blk.ContentWrap>
                <Blk.Content>{props.children}</Blk.Content>
            </Blk.ContentWrap>
        </Blk>
    );
}
