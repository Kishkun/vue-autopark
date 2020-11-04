<template>
    <div>
        <div class="columns">
            <div class="column">
                <h2 class="subtitle has-text-weight-bold">Фильтр</h2>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-field label="Max скорость, км/ч">
                    <BaseSelect
                        id="speed"
                        ref="speed"
                        :items="speedRange"
                        :value="speed"
                        @input="onChangeMaxSpeed"
                    />
                </b-field>
                <b-field label="Пробег, тыс. км.">
                    <BaseSelect
                        id="run"
                        ref="run"
                        :items="runRange"
                        :value="run"
                        @input="onChangeCurrentRun"
                    />
                </b-field>
                <ResetFilterButton @onResetFilter="onResetFilter"/>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseSelect from '../Select/BaseSelect';
  import ResetFilterButton from '../Button/ResetFilterButton';
  
  export default {
    name: 'CarsFilter',
    components: { BaseSelect, ResetFilterButton},
    props: {
      speedRange: {
        type: Array,
        default: () => {
          return []
        }
      },
      runRange: {
        type: Array,
        default: () => {
          return []
        }
      },
      speed: {
        type: [Number, String],
        default: null
      },
      run: {
        type: [Number, String],
        default: null
      }
    },
    methods: {
      onResetFilter() {
        this.$emit('resetFilter')
      },
      onChangeMaxSpeed(value) {
        this.$emit('changeSpeed', value)
      },
      onChangeCurrentRun(value) {
        this.$emit('changeRun', value)
      }
    }
  }
</script>
