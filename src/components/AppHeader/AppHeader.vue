<template>
    <div class="columns has-background-light auto-header">
        <div class="column is-4">
            <h1 class="title">{{ title }}</h1>
        </div>
        <div class="column is-4 has-text-center">
            <h1 class="title">
                <button
                    class="button is-primary is-medium"
                    :disabled="!isEnabledPrev"
                    @click="prevDay"> <
                </button>
                <span class="data-block">Дата: {{ date }}</span>
                <button class="button is-primary is-medium" @click="nextDay"> ></button>
            </h1>
        </div>
        <div class="column is-4 has-text-right">
            <h1 class="title">Машина: {{ carName }}</h1>
        </div>
    </div>
</template>
<script>
  import moment from 'moment'

  import {DATE_FORMAT} from '@/app.constants'
  import {today} from '@/helpers/utils'

  export default {
    name: 'AppHeader',
    props: {
      title: {
        type: String,
        default: 'Мой автопарк'
      },
      date: {
        type: String,
        default: ''
      },
      carName: {
        type: String,
        default: 'Нет брони'
      }
    },
    computed: {
      isEnabledPrev() {
        return moment(this.date).isAfter(today())
      }
    },
    methods: {
      prevDay() {
        const date = moment(this.date);
        this.$emit('changeDate', date.add(-1, 'days').format(DATE_FORMAT))
      },
      nextDay() {
        const date = moment(this.date);
        this.$emit('changeDate', date.add(1, 'days').format(DATE_FORMAT))
      }
    }
  }
</script>
<style scoped>
    .auto-header {
        min-height: 80px;
        align-items: center;
    }
    .data-block {
        vertical-align: middle;
        margin: 0 30px;
    }
</style>
