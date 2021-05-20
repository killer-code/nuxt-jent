<template>
  <footer>
    <p>
      © {{ year }}, «Фармамед». Все права защищены.
    </p>
    <p>Правовая информация</p>
  </footer>
</template>

<script>
export default {
  name: 'StaticFooter',
  computed: {
    year: function() {
      return this.$moment(new Date()).format('YYYY')
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: auto;
  font-size: 12px;

  p {
    color: white;
    opacity: 0.5;
    text-align: center;
  }
}
</style>
