Accordion
```
const AccordionPanel = require('../src/js/components/AccordionPanel');
const Avatar = require('../src/js/components/Avatar');
const ListItem = require('../src/js/components/ListItem');

<Accordion>
  <AccordionPanel animate={false} isCollapsible={false} caretPos="left" heading={(
    <ListItem flex justify='between' separator="none" header>
      <span style={{ flexBasis: '8%' }} />
      <span style={{ flexBasis: '18%' }}>
        TÊN NHÂN VIÊN
      </span>
      <span style={{ flexBasis: '12%' }}>
        MÃ NHÂN VIÊN
      </span>
      <span style={{ flexBasis: '16%' }}>
        VỊ TRÍ CÔNG VIỆC
      </span>
      <span style={{ flexBasis: '18%' }}>
        QUẢN LÝ TRỰC TIẾP
      </span>
      <span style={{ flexBasis: '16%' }}>
        BỘ PHẬN
      </span>
      <span style={{ flexBasis: '12%' }}>
        TRẠNG THÁI
      </span>
    </ListItem>
  )}>
  </AccordionPanel>

  <AccordionPanel caretPos="left" heading={(
    <ListItem flex justify='between' separator="none">
      <span style={{ flexBasis: '8%' }}>
        <Avatar size="small-thumb" mask src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
      </span>
      <span style={{ flexBasis: '18%' }}>
        Vũ Hoàng Anh
      </span>
      <span style={{ flexBasis: '12%' }}>
        A3234
      </span>
      <span style={{ flexBasis: '16%' }}>
        Front-end developer
      </span>
      <span style={{ flexBasis: '18%' }}>
        Ngọc Trần
      </span>
      <span style={{ flexBasis: '16%' }}>
        Development
      </span>
      <span style={{ flexBasis: '12%' }}>
        Đang hoạt động
      </span>
    </ListItem>
  )}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </AccordionPanel>
</Accordion>
```