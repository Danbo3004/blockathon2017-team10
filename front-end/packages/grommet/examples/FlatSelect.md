```
initialState = {
  selectedValue: 1
};

const options = [
  {
    value: 1,
    label: 'Mỗi năm một lần',
    subLabel: 'Một năm có 1 kì đánh giá nhân viên'
  },
  {
    value: 2,
    label: 'Nửa năm một lần',
    subLabel: 'Một năm có 2'
  },
  {
    value: 3,
    label: 'Mỗi quý một lần',
    subLabel: 'Một năm có 4 kì đánh giá nhân viên'
  },
  {
    value: 4,
    label: 'Mỗi tháng một lần',
    subLabel: 'Một năm có 12 kì đánh giá nhân viên'
  }
];

<FlatSelect 
  onSelect={(option) => setState({selectedValue: option.value})} 
  type="box"
  gap={15}
  value={state.selectedValue}
  options={options}
  description={<div>This is a caret box</div>}
/>
```

```
initialState = {
  selectedValue: 1
};

const options = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3
  }
];

<FlatSelect
  onSelect={(option) => setState({selectedValue: option.value})} 
  type="sticking-button"
  value={state.selectedValue}
  options={options}
/>
```