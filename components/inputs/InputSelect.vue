<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    options: {
        required: true,
        type: Array as () => any[]
    },
    attributes: {
        type: Object,
        default: () => {}
    },
    multiple: {
        type: Boolean,
        required: false,
        default: false
    },
    displayKey: {
        type: String,
        required: false,
        default: ''
    },
    valueKey: {
        type: String,
        required: false,
        default: ''
    },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField<any>(() => props.name);

const isSelected = (item: any) => {
    const compareValue = props.valueKey ? item[props.valueKey] : item[props.displayKey];
    if(props.multiple && value.value){
        return value.value.findIndex((opt: any) => {
            if(typeof (opt) === 'object'){
                const currCompareValue = props.valueKey ? opt[props.valueKey] : opt[props.displayKey];
                return currCompareValue === compareValue;
            }
            return compareValue === opt;
        });
    }
    return -1;
}

const selectModel = computed(() =>{
    if(props.multiple && value.value){
        return value.value.map((opt: any) => {
            if(typeof (opt) === 'object'){
                return opt[props.displayKey]
            } else {
                if(props.valueKey){
                    console.log(opt, 'opppttt')
                    const found = props.options.find((o) => o[props.valueKey] === opt);
                    return found?.[props.displayKey] || opt;
                }
                return opt
            }
        }).join(', ');
    }
    return value.value || props.attributes?.placeholder || `Select a ${props.name}`;
})

const handleSelect = (selectedValue: any) => {
    const finalValue = props.valueKey ? selectedValue[props.valueKey] : selectedValue;
    if(props.multiple){
        if(value.value){
            const idx = isSelected(selectedValue);
            if(idx >= 0) {
                value.value.splice(idx, 1);
            } else {
                value.value.push(finalValue);
            }
        } else {
            value.value = [finalValue];
        }
    } else {
        value.value = finalValue
    }
}

</script>
<template>
    <fieldset class="fieldset dropdown">
        <label class="label capitalize">
            {{ name }}
        </label>
        <div role="button"
             tabindex="0"
             class="input flex items-end pb-3 overflow-x-auto overflow-y-hidden">
            {{selectModel}}
        </div>
        <ul tabindex="0" class="dropdown-content w-full top-24 z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box">
            <li v-for="opt in options" :key="opt[displayKey]" :class="['capitalize', {'font-semibold text-primary': isSelected(opt) >= 0}]">
                <a @click.prevent="handleSelect(opt)">
                    {{ opt?.[displayKey] || opt  }}
                </a>
            </li>
        </ul>
<!--        <select v-model="selectModel" class="select capitalize" v-bind="attributes">-->
<!--            <option disabled>Select Role</option>-->
<!--            <option v-for="opt in options" class="capitalize" :value="opt">-->
<!--                <slot name="option" :data="opt">-->
<!--                    {{ opt?.[displayKey] || opt  }}-->
<!--                </slot>-->
<!--            </option>-->
<!--        </select>-->
        <div class="label text-error">
            {{ errorMessage }}
        </div>
    </fieldset>
</template>
