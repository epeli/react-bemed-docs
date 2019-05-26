import React from "react";
import { rem } from "polished";

import { bemed } from "react-bemed";
import { css } from "react-bemed/css";
import { Menu } from "./Menu";

const MOBILE_BREAK_POINT = rem(740);

const MENU_WIDTH = rem(250);

const Blk = bemed({
    css: css`
        flex-direction: row-reverse;
        min-height: 100vh;
    `,
    elements: {
        MenuContainer: bemed({
            css: css`
                width: ${MENU_WIDTH};
                position: fixed;
                left: 0;
                top: 0;
                background-color: red;
                bottom: 0;
                @media (max-width: ${MOBILE_BREAK_POINT}) {
                    display: none;
                }
            `,
            mods: {
                showMobile: css`
                    @media (max-width: ${MOBILE_BREAK_POINT}) {
                        display: flex;
                        top: 0;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                    }
                `,
            },
        }),
        ContentWrap: bemed({
            css: css`
                @media (min-width: ${MOBILE_BREAK_POINT}) {
                    margin-left: ${MENU_WIDTH};
                }
                width: 100%;
            `,
        }),
        Content: bemed({
            css: css`
                width: 100%;
                padding-left: ${rem(30)};
                padding-right: ${rem(30)};
                padding-bottom: ${rem(100)};
                max-width: ${rem(800)};
            `,
        }),
        MenuButton: bemed({
            as: "button",
            defaultProps: {
                type: "button",
            },
            css: css`
                position: fixed;
                bottom: ${rem(30)};
                right: ${rem(30)};
                height: ${rem(50)};
                width: ${rem(50)};
                @media (min-width: ${MOBILE_BREAK_POINT}) {
                    display: none;
                }
            `,
        }),
    },
})("Layout");

export function Layout(props: { children: React.ReactNode }) {
    const [isMobileMenuVisible, setMobileMenuVisible] = React.useState(false);
    const toggleMenu = () => setMobileMenuVisible(visible => !visible);

    return (
        <Blk>
            <Blk.ContentWrap>
                <Blk.Content>{props.children}</Blk.Content>
            </Blk.ContentWrap>

            <Blk.MenuContainer showMobile={isMobileMenuVisible}>
                <Menu />
            </Blk.MenuContainer>

            <Blk.MenuButton onClick={toggleMenu}>ding</Blk.MenuButton>
        </Blk>
    );
}
