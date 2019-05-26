import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { bemed } from "react-bemed";
import { css } from "react-bemed/css";
import theme from "prism-react-renderer/themes/nightOwl";
import { rem } from "polished";

const Code = bemed({
    css: css`
        overflow-x: auto;
        padding: 10px;
        margin-top: ${rem(5)};
        margin-bottom: ${rem(5)};
    `,
    elements: {
        Line: bemed({
            css: css`
                display: block;
            `,
            mods: {
                focusLine: css`
                    background-color: rgb(68, 63, 62);
                `,
                firstFocusLine: css`
                    margin-top: 5px;
                    padding-top: 5px;
                `,
                lastFocusLine: css`
                    margin-bottom: 5px;
                    padding-bottom: 5px;
                `,
            },
        }),

        LineNumber: bemed({
            as: "span",
            css: css`
                display: inline;
                margin-right: 20px;
                margin-left: 20px;
            `,
        }),
    },
})("CodeHighlight");

interface Range {
    start: number;
    end: number;
}

function isInRange(line: number, ranges?: Range[]) {
    if (!ranges) {
        return false;
    }

    for (const range of ranges) {
        if (line >= range.start && line <= range.end) {
            return true;
        }
    }

    return false;
}

function isFirstInRange(line: number, ranges?: Range[]) {
    if (!ranges) {
        return false;
    }

    for (const range of ranges) {
        if (line === range.start) {
            return true;
        }
    }

    return false;
}

function isLastInRange(line: number, ranges?: Range[]) {
    if (!ranges) {
        return false;
    }

    for (const range of ranges) {
        if (line === range.end) {
            return true;
        }
    }

    return false;
}

function parseCodeFence(fence?: string): Range[] {
    if (!fence) {
        return [];
    }

    const ranges: Range[] = [];

    fence.replace(/\{([0-9]+),([0-9]+)\}/g, (_, start, end) => {
        ranges.push({
            start: Number(start),
            end: Number(end),
        });

        return "";
    });

    return ranges;
}

export function MdxCodeBlock(props: { className?: string; children: string }) {
    return (
        <CodeBlock highlightRanges={parseCodeFence(props.className)}>
            {props.children}
        </CodeBlock>
    );
}

export function CodeBlock(props: {
    highlightRanges?: Range[];
    children: string;
}) {
    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={props.children.trim()}
            language="jsx"
        >
            {hl => (
                <Code className={hl.className} style={hl.style}>
                    {hl.tokens.map((line, i) => (
                        <Code.Line
                            {...hl.getLineProps({ line, key: i })}
                            focusLine={isInRange(i + 1, props.highlightRanges)}
                            firstFocusLine={isFirstInRange(
                                i + 1,
                                props.highlightRanges,
                            )}
                            lastFocusLine={isLastInRange(
                                i + 1,
                                props.highlightRanges,
                            )}
                        >
                            <Code.LineNumber>{i + 1}</Code.LineNumber>
                            {line.map((token, key) => (
                                <span {...hl.getTokenProps({ token, key })} />
                            ))}
                        </Code.Line>
                    ))}
                </Code>
            )}
        </Highlight>
    );
}