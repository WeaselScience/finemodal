import { check } from 'meteor/check';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { Stack } from './Stack.js';

export class FineModal {
    constructor(options) {
        check(options, {
            template: Blaze.Template,
            data: Match.Maybe(Match.Any),
            keyboard: Match.Maybe(Boolean),
            backdrop: Match.Maybe(Boolean)
        });

        Object.assign(this, {
            data: {},
            keyboard: true,
            backdrop: true
        }, options);

        this._isVisible = new ReactiveVar(false);
    }

    show() {
        if (this._isVisible.get()) {
            return;
        }

        this._isVisible.set(true);

        Stack.push(this);

        this._stackIndex = Stack.length - 1;

        if (!this._isAlone()) {
            const $prev = this._getPreviousModalInStack()._getModalNode();

            $prev.modal('hide');

            $prev.one('hidden.bs.modal', () => {
                this._build();
            });
        } else {
            this._build();
        }
    }

    _build() {
        this._view = Blaze.renderWithData(
            this.template,
            this.data,
            $('body').get(0)
        );

        this._view.__FineModalInstance = this;

        this._getModalNode().modal('show');

        let prev;
        if (!this._isAlone()) {
            prev = this._getPreviousModalInStack();
        }

        this._getModalNode().on('hidden.bs.modal', () => {
            if (this._isLastInStack()) {
                if (this._onHideCallbacks) {
                    this._onHideCallbacks.forEach(callback => callback());
                }

                Blaze.remove(this._view);
                this._isVisible.set(false);
                Stack.pop();

                if (prev) {
                    prev._getModalNode().modal('show');
                }
            }
        });

        if (this._onShowCallbacks) {
            this._onShowCallbacks.forEach(callback => callback());
        }
    }

    hide() {
        if (!this._isVisible.get()) {
            return;
        }

        this._getModalNode().modal('hide');
    }

    _getPreviousModalInStack() {
        if (this._isAlone()) {
            throw new Error('no-prev');
        }

        return Stack[this._stackIndex - 1];
    }

    _isAlone() {
        return Stack.length <= 1;
    }

    _isLastInStack() {
        return _(Stack).last() === this;
    }

    _getModalNode() {
        if (!this._view) {
            throw new Error('no-view');
        }

        return this._getInstance().$('.modal');
    }

    _getInstance() {
        if (!this._view) {
            throw new Error('no-view');
        }

        return Blaze.TemplateInstance(this._view);
    }

    isVisible() {
        return this._isVisible.get();
    }

    onShow(callback) {
        this._onShowCallbacks = this._onShowCallbacks || [];

        this._onShowCallbacks.push(callback);
    }

    onHide(callback) {
        this._onHideCallbacks = this._onHideCallbacks || [];

        this._onHideCallbacks.push(callback);
    }
}