import { Stack } from './Stack.js';
import { _ } from 'meteor/underscore';

export const FineModalUtil = {
    currentModal() {
        const instance = Template.instance();

        if (!instance) {
            throw new Error('no template instance');
        }

        let parentWithModalInstance = instance.view;

        while (!parentWithModalInstance.__FineModalInstance) {
            parentWithModalInstance = parentWithModalInstance.parentView;
        }

        return parentWithModalInstance.__FineModalInstance;
    },
    topmostModal() {
        return _(Stack).last();
    }
};