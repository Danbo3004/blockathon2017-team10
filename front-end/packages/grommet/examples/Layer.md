```
const Button = require('../src/js/components/Button');

initalStates = {
  isOpen: false
};

<div>
  <Button onClick={() => setState({isOpen: true})} label="Open Layer" />
  { state.isOpen ? (
      <Layer closer={true} onClose={() => {setState({isOpen: false})}} minWidth={400}>
        <div>This is edit unit layer</div>
      </Layer>
    ) : null 
  }
</div>
```