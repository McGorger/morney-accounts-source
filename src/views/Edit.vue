<template>
  <Layout show>
    <div class="navBar">
      <div class="left">
        <Icon name="left" @click="goBack" />
      </div>
      <div class="title">
        <div class="iconWrapper">
          <Icon :name="record.tags.currentTag" />
        </div>
        <div>{{ record.tags.tagName }}</div>
      </div>
      <div class="right"></div>
    </div>
    <ul class="main">
      <li>
        <span class="name">类型</span>
        <span class="type">{{ record.type==="-"?'支出':'收入' }}</span>
      </li>
      <li>
        <label>
          <span class="name">金额</span>
          <input @input="changeAmount" type="number" :value="record.amount" />
        </label>
      </li>
      <li class="date">
        <label>
          <span class="name">日期</span>
          <div class="input">
            <input
              @input="changeValueYear(record.createdAt,$event)"
              type="datetime-local"
              :value="currentAt(record.createdAt)"
            />年
            <input
              @input="changeValueMonth(record.createdAt,$event)"
              type="datetime-local"
              :value="currentAt(record.createdAt)"
            />月
            <input
              @input="changeValueday(record.createdAt,$event)"
              type="datetime-local"
              :value="currentAt(record.createdAt)"
            />日
          </div>
        </label>
      </li>
      <li>
        <label>
          <span class="name">备注</span>
          <input @input="changeNote" type="text" :value="record.notes" />
        </label>
      </li>
    </ul>
    <div class="footer">
      <button @click="changeOk">编辑完成</button>
      <button>删除</button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class Edit extends Vue {
  isoString: string = "";
  record!: RecordItem;
  goBack() {
    this.$router.push("/home");
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchRecords");
    this.$store.commit("setCurrentRecords", id);
    this.record = this.$store.state.currentRecord;
  }
  changeAmount(e:any){
    this.record.amount = parseFloat(e.target.value); 
  }
 changeNote(e:any){
   this.record.notes = e.target.value; 
 }
  currentAt(iso: string) {
    this.isoString = dayjs(iso).format("YYYY-MM-DDThh:ss");
    console.log(this.isoString);
    return this.isoString;
  }
  changeValueYear(value: string, e: any) {
    if (dayjs(e.target.value).valueOf() - dayjs(value).valueOf() > 0) {
      this.record.createdAt = dayjs(value).add(1, "year").toISOString();
    } else {
      this.record.createdAt = dayjs(value).subtract(1, "year").toISOString();
    }
  }
  changeValueMonth(value: string, e: any) {
    if (dayjs(e.target.value).valueOf() - dayjs(value).valueOf() > 0) {
     
      this.record.createdAt = dayjs(value)
        .add(1, "month")
        .toISOString();
    } else {
      this.record.createdAt = dayjs(value)
        .subtract(1, "month")
        .toISOString();
    }
  }
  changeValueday(value: string, e: any) {
    if (dayjs(e.target.value).valueOf() - dayjs(value).valueOf() > 0) {
  
      this.record.createdAt = dayjs(value)
        .add(1, "day")
        .toISOString();
    } else {
      this.record.createdAt = dayjs(value)
        .subtract(1, "day")
        .toISOString();
    }
  }
  changeOk(){
    this.$store.commit('updateRecord',this.record)
   this.$router.push("/home");
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: $font-highlight;
  > .left {
    > .icon {
      width: 30px;
      height: 30px;
    }
  }
  > .title {
    > .iconWrapper {
      background: #eee;
      border-radius: 50%;
      padding: 8px;
      margin-bottom: 8px;
      > .icon {
        width: 40px;
        height: 40px;
      }
    }
    > div {
      text-align: center;
    }
  }
}
.main {
  padding: 8px 18px;
  flex-grow: 1;
  > li {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    .name {
      color: grey;
      margin-right: 10px;
    }
    label {
      display: flex;
      align-items: center;

      input {
        flex: 1;
        border: none;
        height: 40px;
      }
      .input {
        border-radius: 5px;
        input[type="datetime-local"] {
          text-align: center;
             margin-right: -5px;
          font-size: 18px;
          &::-webkit-calendar-picker-indicator {
            display: none;
          }
          &::-webkit-clear-button {
            display: none;
          }
          &::-webkit-datetime-edit-text {
            display: none;
          }
          &::-webkit-datetime-edit-day-field {
            display: none;
          }

          &:first-child {
            width: 50px;
          }
          &:nth-of-type(2) {
            width: 28px;
          }
          &:last-child {
            width: 28px;
          }
          &:first-child::-webkit-datetime-edit-month-field {
            display: none;
          }
          &:first-child::-webkit-datetime-edit-minute-field {
            display: none;
          }
          &:first-child::-webkit-datetime-edit-hour-field {
            display: none;
          }
          &:nth-of-type(2)::-webkit-datetime-edit-year-field {
            display: none;
          }
          &:nth-of-type(2)::-webkit-datetime-edit-minute-field {
            display: none;
          }
          &:nth-of-type(2)::-webkit-datetime-edit-hour-field {
            display: none;
          }
          &:last-child::-webkit-datetime-edit-year-field {
            display: none;
          }
          &:last-child::-webkit-datetime-edit-month-field {
            display: none;
          }
          &:last-child::-webkit-datetime-edit-day-field {
            display: block;
          }
          &:last-child::-webkit-datetime-edit-minute-field {
            display: none;
          }
          &:last-child::-webkit-datetime-edit-hour-field {
            display: none;
          }
        }
      }
    }
  }
}
.footer {
  border-top: 1px solid #ddd;
  padding: 0 16px;
  button {
    width: 50%;
    font-size: 14px;
    padding: 4px 0;
    margin: 12px 0;
    &:first-child {
      border-right: 1px solid #ddd;
    }
    &:last-child {
      color: #b84e52;
    }
  }
}
</style>
