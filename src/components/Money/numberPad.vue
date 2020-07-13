<template>
  <div class="numberPad">
    <div class="output">
      <span>{{ output }}</span>
    </div>
    <label class="notes">
      <Icon name="note" />
      <span class="name">备注:</span>
      <input @input="notesValue($event.target.value)" type="text" :placeholder="'写点备注吧'" />
    </label>
    <div class="buttons">
      <div class="button-type">
        <button
          v-for="item in Types"
          :key="item"
          :class="{selected:item===type}"
          @click="select(item)"
        >{{ item }}</button>
      </div>
      <div class="button-number">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="inputContent">+</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="inputContent">-</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">完成</button>
        <button @click="inputContent">.</button>
        <button @click="inputContent">0</button>
        <button @click="remove">X</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { EventBus } from "@/event-bus.ts";
console.log(EventBus);
@Component
export default class NumberPad extends Vue {
  //   @Prop(Number) readonly value!: number;
  //    output = this.value.toString();
  Types: String[] = ["收入", "支出"];
  type: string = "收入";
  output: string = "0";
  select(item: string) {
    this.type = item;
  }
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length >= 16) {
      return;
    }
    if (this.output === "0") {
      if ("1234567890".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      if (this.output.includes("+") || this.output.includes("-")) {
        if (this.output.endsWith("+") && this.output.startsWith("-")) {
          return;
        }
      } else {
        return;
      }
    }
    if (this.output.indexOf("+") >= 0 && input === "+") {
      let newOutput = this.output.split("+");
      this.output = (+newOutput[0] + +newOutput[1]).toString();
    }
    if (this.output.indexOf("-") >= 0 && input === "-") {
      if (this.output.indexOf("+") < 0) {
        let newOutput = this.output.split("-");
        if (this.output.indexOf("-") == 0) {
          this.output = "-" + (+newOutput[1] + +newOutput[2]);
        } else {
          this.output = (+newOutput[0] - +newOutput[1]).toString();
        }
      }
    }

    if (this.output.indexOf("-") >= 0 && input === "+") {
      let newOutput = this.output.split("-");
      this.output = (+newOutput[0] - +newOutput[1]).toString();
    }
    if (this.output.indexOf("+") >= 0 && input === "-") {
      let newOutput = this.output.split("+");
      this.output = (+newOutput[0] + +newOutput[1]).toString();
    }
    this.output += button.textContent;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  ok() {}
  notesValue(value: string) {
    console.log(value);
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.numberPad {
  margin-top: 5px;
  background-color: rgba(76, 124, 4, 0.3);
  .notes {
    font-size: 16px;
    padding-left: 5px;
    display: flex;
    align-items: center;
    .name {
      width: 43px;
      padding-right: 8px;
    }
    input {
      height: 50px;
      background: transparent;
      border: none;
      padding-right: 10px;
    }
  }
  .output {
    background: #fff;
    font-size: 30px;
    font-family: Consolas, monospace;
    padding: 5px 5px;
    display: flex;
    box-shadow: inset 0 -3px 3px -3px fade-out($color: black, $amount: 0.6),
      inset 0 3px 3px -3px fade-out($color: black, $amount: 0.6);

    span {
      flex: 1;
      text-align: right;
    }
  }
  .buttons {
    @extend %fixClear;
    display: flex;
    justify-content: space-between;
    $bg: rgba(240, 232, 232, 0.5);
    > .button-type {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 0.5px solid #eee;
      position: relative;
      button {
        text-align: center;
        width: 99%;
        height: 64 * 2px;
        &.selected {
          color: $font-highlight;
          background: rgba(238, 238, 238, 0.7);
        }
      }
      &::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background-color: $bg;
        position: absolute;
        top: 49%;
        left: 0;
      }
    }
    > .button-number {
      flex: 1;
      button {
        border: 0.5px solid $bg;
        width: 25%;
        height: 64px;
        &.ok {
          height: 64 * 2px;
          float: right;
          background-color: $font-highlight;
        }
      }
    }
  }
}
</style>
