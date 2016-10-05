import * as React from "react";
import * as WebMI from "../model/WebMI";

interface Props {
    // The datapoint to subscribe to.
    dp: string;
    // (Optional) A function that converts the value read from the datapoint to another that will be displayed.
    // E.g. mapping a state value to a text string - the mapping function would take a value and return a string.
    map?: (value: number) => any;
    // (Optional) Number of digits to display, default is 1.
    digits?: number 
}

interface State {
    isLoading?: boolean;
    hasError?: boolean;
    value?: number;
}

export default class LiveValue extends React.Component<Props, State> {
    protected subscriptionID: number | undefined;
    state = {
        hasError: false,
        isLoading: false,
        value: undefined
    }

    componentDidMount() {
        this.subscribe(this.props.dp);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillReceiveProps(nextProps: Props) {
        this.subscribe(nextProps.dp);
    }

    subscribe(dp: string) {
        this.setState({ isLoading: true, hasError: false });
        this.unsubscribe();
        this.subscriptionID = WebMI.subscribe(dp, (value, error) => {
            this.setState({
                hasError: error,
                isLoading: false,
                value: value
            });
        });
    }

    unsubscribe() {
        WebMI.unsubscribe(this.subscriptionID);
        this.subscriptionID = undefined;
    }

    // The default mapping function (override using map in props). Will display
    // value as number with fixed number of digits behind decimal point.
    defaultMap = (value: number) => {
        const digits = this.props.digits === undefined ? 1 : this.props.digits;
        return value.toFixed(digits);
    }

    render() {
        const { value, isLoading, hasError } = this.state;
        let output;
        if (hasError) {
            output = "?";
        }
        else if (value === undefined || isLoading) {
            output = "…";
        }
        else {
            output = this.props.map ? this.props.map(value) : this.defaultMap(value);
        }
        return <div className="live-value">{output}</div>;
    }
}
