import { Container } from 'unstated';

class DropdownContainer extends Container {
  state = {
    active: null,
  };

  toggle = id => {
    this.setState(prevState => ({
      active: prevState.active === id ? null : id,
    }));
  };
}

export default DropdownContainer;
