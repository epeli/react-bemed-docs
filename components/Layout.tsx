import React from "react";
import { rem } from "polished";
import { FaHamburger } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { bemed } from "react-bemed";
import { css } from "react-bemed/css";
import { Menu } from "./Menu";
import { Colors, MOBILE_BREAK_POINT } from "./core";
import { MenuFooter } from "./MenuFooter";

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
        MenuFooterContainer: bemed({
            css: css`
                height: 100px;
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: 0px;
            `,
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

                cursor: pointer;
                background-color: ${Colors.black};
                border-style: none;
                border-radius: ${rem(50)};
                color: white;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 0px 10px 3px gray;

                @media (min-width: ${MOBILE_BREAK_POINT}) {
                    display: none;
                }
            `,
            mods: {
                isOpen: css`
                    background-color: white;
                    svg {
                        color: ${Colors.black};
                    }
                `,
            },
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
                <Blk.MenuFooterContainer>
                    <MenuFooter />
                </Blk.MenuFooterContainer>
            </Blk.MenuContainer>

            <Blk.MenuButton onClick={toggleMenu} isOpen={isMobileMenuVisible}>
                {isMobileMenuVisible ? (
                    <MdClose size={25} />
                ) : (
                    <FaHamburger size={25} />
                )}
            </Blk.MenuButton>
        </Blk>
    );
}
