<template>
  <div class="go-chart-configurations-animations" v-if="targetData">
    <n-button
      class="clear-btn go-my-2"
      :disabled="!targetData.styles.animations.length"
      @click="clearAnimation"
    >
      清除动画
    </n-button>
    <collapse-item
      v-for="(item, index) in animations"
      :key="index"
      :name="item.label"
      :expanded="true"
    >
      <n-grid :x-gap="6" :y-gap="10" :cols="3">
        <n-grid-item
          class="animation-item go-transition-quick"
          :class="[
            activeIndex(childrenItem.value) && 'active',
            hoverPreviewAnimate === childrenItem.value &&
              `animate__animated  animate__${childrenItem.value}`
          ]"
          v-for="(childrenItem, index) in item.children"
          :key="index"
          @mouseover="hoverPreviewAnimate = childrenItem.value"
          @click="addAnimation(childrenItem)"
        >
          {{ childrenItem.label }}
        </n-grid-item>
      </n-grid>
    </collapse-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { animations } from '@/settings/animations/index'
import { CollapseItem } from '@/components/Pages/ChartItemSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../hooks/useTargetData.hook'

// 全局颜色
const designStore = useDesignStore()

const hoverPreviewAnimate = ref('')

const { targetData } = useTargetData()

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// * 选中的动画样式
const activeIndex = (value: string) => {
  const selectValue = targetData.value.styles.animations
  if (!selectValue.length) return false
  return selectValue[0] === value
}

// * 清除动画
const clearAnimation = () => {
  targetData.value.styles.animations = []
}

// * 新增动画，现只支持一种
const addAnimation = (item: { label: string; value: string }) => {
  targetData.value.styles.animations = [item.value]
}
</script>

<style lang="scss" scoped>
@include go('chart-configurations-animations') {
  padding: 0;
  .clear-btn {
    width: 100%;
  }
  .animation-item {
    padding: 2px 4px;
    margin: 2px 3px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    @include hover-border-color('hover-border-color');
    &:hover,
    &.active {
      color: v-bind('themeColor');
      border: 1px solid v-bind('themeColor');
    }
  }
}
</style>
