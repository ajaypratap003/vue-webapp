import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import Button from '../Button/Button.vue';

describe("Button",()=>{
    it('should render default button variant primary and default label Save', () => {
        const wrapper=mount(Button);

        expect(wrapper.classes()).toContain('btn-primary');
        expect(wrapper.classes()).not.toContain('btn-secondary');
        expect(wrapper.text()).toContain('Save');
    });

    it('should fire button click event after click on button', async()=>{
        const wrapper=mount(Button);
        wrapper.vm.$emit('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted()).toHaveProperty('click');
        expect(wrapper.emitted('click')).toHaveLength(1);
        // assert event has been emitted
        expect(wrapper.emitted().click).toBeTruthy();
        // assert event count
        expect(wrapper.emitted().click.length).toBe(1);
    });
});