import * as React from "react";
import Icon from "./Icon";
const svgArrow = require("!raw!../../resources/icons/nav_arrow.svg");

interface Props {
    pageSize: number;
    pageMargin: number;
    numPages: number;
}

interface State {
    width?: number
    offset: number
    animating?: boolean
}

// Corresponds to the width of the paging buttons
const PADDING_LEFT = 65;

export default class Carousel extends React.Component<Props, State> {
    protected el: HTMLElement | undefined;

    constructor() {
        super();
        this.state = {
            width: 0,
            offset: 0,
            animating: true
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateSize);
        this.updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    componentWillReceiveProps() {
        // Probably props.children has changed, reset offset without animating.
        this.setState({
            offset: 0,
            animating: false
        });
    }

    updateSize = () => {
        const width = this.el ? this.el.clientWidth : 0;
        const maxOffset = Math.max(0, this.totalWidth - width);
        this.setState({
            offset: Math.min(maxOffset, this.state.offset),
            width: width,
            animating: true
        });
    }

    didMountDOMElement = (el) => {
        this.el = el;
        this.updateSize();
    }

    didClickLeft = () => {
        const { width, offset } = this.state;
        const { pageSize, numPages, pageMargin } = this.props;
        const totalPageWidth = pageSize + pageMargin;
        // Which page is cut off by or exactly at the left border?
        let firstVisiblePage = (offset - PADDING_LEFT) / totalPageWidth;
        const newLastPage = Math.floor(firstVisiblePage);
        const newOffset = newLastPage * totalPageWidth - (width - totalPageWidth);
        this.setState({
            offset: Math.max(0, newOffset),
            animating: true
        });
    }

    didClickRight = () => {
        const { width, offset } = this.state;
        const { pageSize, numPages, pageMargin } = this.props;
        const totalPageWidth = pageSize + pageMargin;
        // Which page is cut off by the right border?
        const lastVisiblePage = (offset + width + pageMargin) / totalPageWidth;
        // Make this the first page visible on the left
        const newFirstPage = Math.floor(lastVisiblePage);
        const newOffset = newFirstPage * totalPageWidth - PADDING_LEFT;    
        // Don't scroll too much
        const maxOffset = this.totalWidth - this.state.width;
        this.setState({
            offset: Math.min(newOffset, maxOffset),
            animating: true
        });
    }

    get totalWidth() {
        const { pageSize, numPages, pageMargin } = this.props;
        return numPages * pageSize + (numPages) * pageMargin;
    }

    render() {
        const { width, offset, animating } = this.state;
        const { pageSize, numPages, pageMargin } = this.props;
        const leftButton = offset > 0 ? <div className="left" onClick={this.didClickLeft}><Icon svg={svgArrow}/></div> : undefined;
        const rightButton = offset + width < this.totalWidth - pageMargin ? <div className="right" onClick={this.didClickRight}><Icon svg={svgArrow}/></div> : undefined;
        let contentStyle = {
            transform: `translateX(${-offset}px)`
        };
        if (animating) {
            contentStyle["transition"] = "transform .5s";
        }
        return <div className="carousel" ref={this.didMountDOMElement}>
            {leftButton}
            {rightButton}
            <div className="content" style={contentStyle}>
                {this.props.children}
            </div>
        </div>;
    }
}
