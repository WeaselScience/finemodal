# apotex:finemodal

Another implementation allowing to easily use Boostrap 3 Modals in Meteor.

First of all, you need to define your modal template using the provided helpers:

```html
<template name="myModal">
    {{#FineModal size="sm"}}
        {{>FineModalHeader title="This is My Modal!" hideCloseButton=false}}
        {{#FineModalBody}}
            <div>Hi! I'm a Modal! I was given a data context, and it is: {{this}}</div>
        {{/FineModalBody}}
        {{#FineModalFooter}}
            <button data-action="close" class="btn btn-primary">Close Me!</button>
        {{/FineModalFooter}}
    {{/FineModal}}
</template>
```

Please note that it is not mandatory to use the built-in helpers, and you may
at your leisure design your own Boostrap modal, as long as it's following the
official Boostrap markup guidelines.

```js
import { FineModalUtil } from 'meteor/apotex:finemodal';

Template.modal.events({
    // Let's just implement the custom "Close Me!" button.
    'click [data-action="close"]'() {
        FineModalUtil.currentModal().hide();
    }
});
```

And now, somewhere within your code, you can create and show the modal:

```js
import { FineModal } from 'meteor/apotex:finemodal';

const modal = new FineModal({
    template: Template.myModal, // The template that houses the modal.
    data: 'Horse Potato'
});

modal.show();
```

Upon execution, the result is as follows:

![Tada!](http://i.imgur.com/1IshK9o.png)