<template>
    <div class="report-popup">
      <div class="report-content">
        <h2>Report</h2>
        <h1>igfiyfoiwerw</h1>
        <div class="report-values">
          <div v-for="(value, key) in reportData" :key="key" class="report-value">
            <div class="report-key">{{ key }}:</div>
            <div class="report-value">{{ value }}</div>
          </div>
        </div>
        <button @click="closeReport" class="close-button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Report',
    props: {
      reportData: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeReport() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
.report-values {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
}

.report-value {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5em;
}

.report-key {
  font-weight: bold;
  margin-right: 0.5em;
}

.report-value {
  word-break: break-word;
}
  </style>
  