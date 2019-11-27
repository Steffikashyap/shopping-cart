
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const marks = [
    {
        value: 100,
        label: '$100',
    },
    {
        value: 10000,
        label: '$10000',
    },

];
function valuetext(value) {
    return `${value}$`;
}

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 10000,
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    
    handleFilter = () => {
        this.props.getFilterValue(this.state.value);
    }
    render() {
        return (
            <div className=" filter-panel border-right border-dark" >
                <Row>
                    <Col md={12}>
                        <b className="filterTitle"> Filters</b>
                    </Col>
                    <Col md={12}>
                        <Slider
                            value={this.state.value}
                            onChange={this.handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            min={100} max={10000}
                            marks={marks}
                        />
                        <Typography id="range-slider" gutterBottom>
                            Price
                    </Typography>
                    </Col>
                    <Col md={12}>
                        <button className="btn btn-primary btn-size" onClick={()=>this.handleFilter()} >Apply</button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Filter;