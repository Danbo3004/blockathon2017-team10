```
const moment = require('moment');
const FormField = require('../src/js/components/FormField');
initialState = {
  now: moment()
};
<div>
  <FormField>
    <DatePicker value={state.now} format="D [Tháng] M" onSelect={(date) => setState({now: date})}/>
  </FormField>
</div>
```