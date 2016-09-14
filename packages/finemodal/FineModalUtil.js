export const FineModalUtil = {
    currentModal() {
        const mainView = Template.instance().view;

        let parentWithModalInstance = mainView;

        while (!parentWithModalInstance.__FineModalInstance) {
            parentWithModalInstance = parentWithModalInstance.parentView;
        }

        return parentWithModalInstance.__FineModalInstance;
    }
};