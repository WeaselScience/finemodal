import { FineModal, FineModalUtil } from 'meteor/apotex:finemodal';

Template.main.events({
    'click [data-action="init"]'() {
        const modal = new FineModal({
            template: Template.modal
        });

        /*modal.onShow(() => {
            alert('onShow')
        });

        modal.onHide(() => {
            alert('onHide')
        });*/

        modal.show();
    }
});

Template.modal.events({
    'click [data-action="moar"]'(data, instance) {
        const modal = new FineModal({
            template: Template.modal,
            data: {
                testData: instance.$('input').val()
            }
        });

        modal.show();
    },
    'click [data-action="close"]'() {
        FineModalUtil.currentModal().hide();
    }
});