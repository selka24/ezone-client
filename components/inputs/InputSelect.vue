<script setup lang="ts">
import { useField } from 'vee-validate';
interface Options {

}
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    options: {
        required: true,
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
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField<any>(() => props.name);


const selectModel = computed(() =>{
    if(props.multiple && value.value){
        console.log(value.value.map((opt: any) => opt[props.displayKey]))
        return value.value.map((opt: any) => opt[props.displayKey]).join(', ');
    }
    return value.value || props.attributes?.placeholder || `Select a ${props.name}`;
})

const handleSelect = (selectedValue: any) => {
    if(props.multiple){
        if(value.value){
            const idx = value.value.findIndex((opt: any) => opt[props.displayKey] === selectedValue[props.displayKey]);
            if(idx >= 0) {
                value.value.splice(idx, 1);
            } else {
                value.value.push(selectedValue);
            }
        } else {
            value.value = [selectedValue];
        }
    } else {
        value.value = selectedValue
    }
}

</script>
<template>
    <div class="form-control w-full dropdown">
        <div class="label">
            <span class="label-text">{{ name }}</span>
        </div>
        <div role="button"
             tabindex="0"
             class="input input-bordered flex items-end pb-3 overflow-x-auto overflow-y-hidden">
            {{selectModel}}
        </div>
        <ul tabindex="0" class="dropdown-content w-full top-24 z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box">
            <li v-for="opt in options" :key="opt[displayKey]" class="capitalize">
                <a @click.prevent="handleSelect(opt)">
                    {{ opt?.[displayKey] || opt  }}
                </a>
            </li>
        </ul>
<!--        <select v-model="selectModel" class="select select-bordered capitalize" v-bind="attributes">-->
<!--            <option disabled>Select Role</option>-->
<!--            <option v-for="opt in options" class="capitalize" :value="opt">-->
<!--                <slot name="option" :data="opt">-->
<!--                    {{ opt?.[displayKey] || opt  }}-->
<!--                </slot>-->
<!--            </option>-->
<!--        </select>-->
        <div class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>
