<template>
    <div :class="['card', isBooked ? 'active' : '']">
        <div class="card-image">
            <img :src="photo" alt="Car image" />
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="is-size-6 title">{{ title }}</p>
                </div>
            </div>
            <div class="content">
                <p class="content-info">{{ description }}</p>
                <ul class="options is-size-7">
                    <li><strong>Max скорость: </strong>{{ maxSpeed }} км/ч</li>
                    <li><strong>Пробег: </strong>{{ currentRun }} тыс. км.</li>
                </ul>
            </div>
        </div>
        <footer class="card-footer">
            <ToggleCarBookingButton
                :car-id="carId"
                :title="title"
                :isAllowedBooking="!isBooked"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </footer>
    </div>
</template>
<script>
    import ToggleCarBookingButton from '../Button/ToggleCarBookingButton';
    
    export default {
      name: 'CarCard',
      components: {
        ToggleCarBookingButton
      },
      props: {
        carId: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        photo: {
          type: String,
          default: 'https://bulma.io/images/placeholders/1280x960.png'
        },
        maxSpeed: {
          type: Number,
          required: true
        },
        currentRun: {
          type: Number,
          required: true
        },
        isBooked: {
          type: Boolean,
          default: false
        }
      }
    }
</script>
<style scoped>
    .card {
        transition: .3s;
        border: 2px solid transparent;
        padding: 10px;
    }
    
    .options {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
    .active {
        border-color: hsl(141, 71%, 48%)
    }

    .card-content {
        padding: 0.5rem;
    }
    
    .card-image img {
        height: 175px;
        object-fit: cover;
        object-position: center;
    }
    
    .content-info {
        height: 160px;
    }
</style>
