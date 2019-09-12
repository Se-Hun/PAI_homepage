import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class LibraryDropdown extends Component {

      constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


    render() {
        return (

            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                <DropdownToggle caret color="white">
                  자료실
                </DropdownToggle>

                 <DropdownMenu>
                     <DropdownItem header>교육자료</DropdownItem>
                     <DropdownItem href="/library/ppt">PPT</DropdownItem>
                    <DropdownItem href="/library/code">소스코드</DropdownItem>
                 </DropdownMenu>
            </Dropdown>


        );
    }
}


export default LibraryDropdown;