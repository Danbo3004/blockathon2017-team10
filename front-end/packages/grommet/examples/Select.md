```
const FormField = require('../src/js/components/FormField');
<div>
  <FormField label="Tên Admin">
    <Select options={
      [
        {
          label: 'Option 1',
          value: 1
        },
        { 
          label: 'Option 2',
          value: 2
        },
        { 
          label: 'Option 3',
          value: 3
        }
      ]
    }
    onSearch={() => {}} />
  </FormField>
</div>
```