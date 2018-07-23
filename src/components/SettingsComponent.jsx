import React, {Component} from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeAutomaticSuspensionTime = () => {
        
    }

    render() {
        return(
            <div>
                <span>
                    Automatically pause tabs after:
                </span>
                <span>
                    <Select defaultValue={1} style={{ width: 120 }} onChange={this.changeAutomaticSuspensionTime}>
                        <Option value={-1}>Never</Option>
                        <Option value={5}>5 minutes</Option>
                        <Option value={10}>10 minutes</Option>
                        <Option value={30}>30 minutes</Option>
                        <Option value={60}>60 minutes</Option>
                    </Select>
                </span>
            </div>
        )
    }
}

export default SettingsComponent;