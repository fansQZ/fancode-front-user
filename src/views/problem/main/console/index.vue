<template>
  <div class="console">
    <el-menu
      :default-active="activeIndex"
      class="select-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="input">输入用例</el-menu-item>
      <el-menu-item index="output">输出</el-menu-item>
    </el-menu>
    <div class="input-div" v-if="activeIndex == 'input'">
      <Input v-model="inputCase" />
    </div>
    <div class="output-div" v-if="activeIndex == 'output'">
      <Output
        :status="status"
        :errorMessage="errorMessage"
        :outputStatus="outputStatus"
        :caseName="caseName"
        :caseData="caseData"
        :userOutput="userOutput"
        :expectedOutput="expectedOutput"
      />
    </div>
    <div class="option-bottom">
      <div class="left"></div>
      <div class="right">
        <el-button class="button-execute" type="primary" @click="execute">运行</el-button>
        <el-button class="button-submit" type="success" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Output from './output.vue';
  import Input from './input.vue';
  // 用于控制当前是输入界面还是输出界面
  let activeIndex = ref('input');

  const props = defineProps([
    'modelValue',
    'outputStatus',
    'errorMessage',
    'caseName',
    'caseData',
    'expectedOutput',
    'userOutput',
    'status',
  ]);

  const emit = defineEmits(['update:modelValue', 'submit', 'execute']);
  // input的双向绑定
  const inputCase = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  // 提交
  const submit = () => {
    emit('submit');
    activeIndex.value = 'output';
  };

  // 执行
  const execute = () => {
    emit('execute');
    activeIndex.value = 'output';
  };
</script>

<style scoped lang="scss">
  .console {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    .select-menu {
      height: 30px;
    }
    .input-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
      padding: 15px;
    }
    .output-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
      padding: 15px;
    }
    .option-bottom {
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid $base-border-color;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .button-execute {
        margin-left: 30px;
        margin-right: 10px;
      }
      .button-submit {
        margin-left: 10px;
        margin-right: 30px;
      }
    }
  }
</style>
