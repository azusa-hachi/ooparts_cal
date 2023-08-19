<template>
  <q-layout view="hHh lpr fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>

        <q-toolbar-title>
          ブルーアーカイブ <br class="lt-md">育成素材カリキュレーター
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container class="body-box">
      <div class="row">
        <div class="col bg-grey-4"></div>
        <div class="col-12 wrapper-box">
          <div class="row">
            <div class="col-12 col-md-6 big-box">
              <div class="row q-pt-md gt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-chip color="red" text-color="white">検索画面</q-chip>
                </div>
              </div>
              <div class="row q-pt-md">
                <div class="col-1"></div>
                <div class="col-10">
                  <q-select
                    filled
                    :model-value="selectCharacters"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="characterLists"
                    option-value="id"
                    option-label="name"
                    @filter="filterCharacters"
                    @input-value="setSelectCharacters"
                    label="生徒名（入力検索できます）"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-chip color="primary" text-color="white">EXスキル</q-chip>
                </div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col-2">
                  before
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="exBefore"
                      marker-labels
                      :min="1"
                      :max="5"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-2">
                  after
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="exAfter"
                      marker-labels
                      :min="1"
                      :max="5"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-chip color="primary" text-color="white">ノーマルスキル</q-chip>
                </div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col-2">
                  before
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="nsBefore"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-2">
                  after
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="nsAfter"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-chip color="primary" text-color="white">パッシブスキル</q-chip>
                </div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col-2">
                  before
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="psBefore"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-2">
                  after
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="psAfter"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-chip color="primary" text-color="white">サブスキル</q-chip>
                </div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col-2">
                  before
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="ssBefore"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row">
                <div class="col-1"></div>
                <div class="col-2">
                  after
                </div>
                <div class="col-8">
                  <q-slider
                      v-model="ssAfter"
                      marker-labels
                      :min="1"
                      :max="10"
                    />
                </div>
                <div class="col-1"></div>
              </div>
            </div>
            <div class="col-12 col-md-6 result-box big-box">
              <div class="row q-pt-md">
                <div class="col-1"></div>
                <div class="col">
                  <div class="row justify-between">
                    <div>
                      <q-chip color="red" text-color="white">計算結果</q-chip>
                      <q-icon size="3em">
                        <img v-if="findCharacterId" :src="`https://www.azusa-hachi.com/files/ooparts/icon/${ findCharacterId.id }.png`">
                      </q-icon>
                    </div>
                    <q-btn round :loading="loading" color="indigo" @click="saveBtn(calresult, credit)">
                      <font-awesome-icon :icon="['far', 'floppy-disk']" style="color: #ffffff;" size="lg" />
                      <template v-slot:loading>
                        <q-spinner-puff />
                      </template>
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        <div>合計計算</div>
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div class="col-1">
                </div>
              </div>
              <div class="row q-pt-md">
                <div class="col-1 gt-sm"></div>
                <div class="col">
                  <q-table
                    :rows="calresult"
                    :columns="calresultTitle"
                    row-key="name"
                    hide-bottom
                    v-model:pagination="pagination"
                  />
                </div>
                <div class="col-1 gt-sm"></div>
              </div>
              <div class="row q-pt-md">
                <div class="col-1"></div>
                <div class="col">
                  <p class="text-body2">消費クレジット：{{ credit }}</p>
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-md justify-start">
                <div class="col-1"></div>
                <div class="col">
                  <div class="row items-center">
                    <q-chip color="red" text-color="white">合計計算</q-chip>
                    ※生徒アイコンをクリックで除外
                  </div>
                </div>
              </div>
              <div class="row q-pt-sm">
                <div class="col-1"></div>
                <div class="col">
                  <q-btn v-for="(data,i) in savedData" :key="i" style="margin-right: 1em;">
                    <q-icon size="3em">
                      <img :src="`https://www.azusa-hachi.com/files/ooparts/icon/${ data.character.id }.png`">
                    </q-icon>
                    <q-menu class="bg-primary text-white" auto-close>
                      <q-list>
                        <q-item class="bg-blue-9 cursor-pointer">
                          <q-item-section @click="deleteBtn(i)">除外する</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item>
                          <q-item-section>EX：{{ data.exBefore }} => {{ data.exAfter }}</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item>
                          <q-item-section>NS：{{ data.nsBefore }} => {{ data.nsAfter }}</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item>
                          <q-item-section>PS：{{ data.psBefore }} => {{ data.psAfter }}</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item>
                          <q-item-section>SS：{{ data.ssBefore }} => {{ data.ssAfter }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
                <div class="col-1"></div>
              </div>
              <div class="row q-pt-md">
                <div class="col-1 gt-sm"></div>
                <div class="col">
                  <q-table
                    :rows="sumData"
                    :columns="calresultTitle"
                    row-key="name"
                    hide-bottom
                    v-model:pagination="pagination"
                  />
                </div>
                <div class="col-1 gt-sm"></div>
              </div>
              <div class="row q-pt-md q-pb-lg">
                <div class="col-1"></div>
                <div class="col">
                  <p class="text-body2">消費クレジット：{{ sumCredit }}</p>
                </div>
                <div class="col-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-grey-4"></div>
      </div>

    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white fixed-footer">
      <q-toolbar>
        <div class="row fit">
          <div class="col"></div>
          <div class="col-12 wrapper-box developed-by">
            developed by
            <q-btn href="https://twitter.com/Azusa_hachi" color="primary" target="_blank" dense style="text-transform: none">
              <font-awesome-icon :icon="['fab', 'twitter']" style="color: #ffffff;" />@Azusa_hachi
            </q-btn>
          </div>
          <div class="col"></div>
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
  import { onMounted, computed, ref } from 'vue'
  import axios from 'axios'

  function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return undefined; //値が存在しなかったとき
  }

  const requireBd = {
    1: {0:12, 1:0, 2:0, 3:0},
    2: {0:18, 1:12, 2:0, 3:0},
    3: {0:0, 1:18, 2:12, 3:0},
    4: {0:0, 1:0, 2:18, 3:8},
  }

  const requireCreditEx = {
    1: 80000,
    2: 500000,
    3: 3000000,
    4: 10000000,
  }

  const requireNote = {
    1: {0:5, 1:0, 2:0, 3:0},
    2: {0:8, 1:0, 2:0, 3:0},
    3: {0:12, 1:5, 2:0, 3:0},
    4: {0:0, 1:8, 2:0, 3:0},
    5: {0:0, 1:12, 2:5, 3:0},
    6: {0:0, 1:0, 2:8, 3:0},
    7: {0:0, 1:0, 2:12, 3:8},
    8: {0:0, 1:0, 2:0, 3:12},
    9: {0:0, 1:0, 2:0, 3:0},
  }

  const requireCreditNs = {
    1: 5000,
    2: 7500,
    3: 60000,
    4: 90000,
    5: 300000,
    6: 450000,
    7: 1500000,
    8: 2400000,
    9: 4000000,
  }

  const school = {
    0: 'アビドス',
    1: 'ゲヘナ',
    2: 'トリニティ',
    3: 'ミレニアム',
    4: '百鬼夜行',
    5: '山海経',
    6: 'レッドウィンター',
    7: 'ヴァルキューレ',
    8: 'アリウス',
  }

  //ひらがなtoカタカナ変換
  function hiraToKana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
  }

  export default {
    name: 'AppOopartsCal',
    setup () {
      const characterJson = ref([])
      const reqCharacterJson = ref([])

      const selectCharacters = ref()
      const characterLists = ref(characterJson.value)
      const exBefore = ref(1)
      const exAfter = ref(5)
      const nsBefore = ref(1)
      const nsAfter = ref(10)
      const psBefore = ref(1)
      const psAfter = ref(10)
      const ssBefore = ref(1)
      const ssAfter = ref(10)
      const calresultTitle = [
        {name: 'name', label: '素材', align: 'center', field: 'name'},
        {name: 'white', label: '初級', align: 'center', field: 'white'},
        {name: 'blue', label: '中級', align: 'center', field: 'blue'},
        {name: 'orange', label: '上級', align: 'center', field: 'orange'},
        {name: 'purple', label: '最上級', align: 'center', field: 'purple'},
      ]
      const sumData = ref([])
      const loading = ref(false)
      const sumCredit = ref('0')
      const savedData = ref([])
      const calCount = ref(0)

      onMounted(() => {
        axios.get('https://www.azusa-hachi.com/files/ooparts/json/characters.json')
          .then(response => {
            characterJson.value = response.data
          }).catch(err => {
            console.log(err)
          })
        axios.get('https://www.azusa-hachi.com/files/ooparts/json/req_characters.json')
          .then(response => {
            reqCharacterJson.value = response.data
          }).catch(err => {
            console.log(err)
          })
        const OopartsCalSumData = JSON.parse(localStorage.getItem('OopartsCalSumData'))
        if(OopartsCalSumData != null) {
          sumData.value = OopartsCalSumData
        }
        const OopartsCalSumCredit = JSON.parse(localStorage.getItem('OopartsCalSumCredit'))
        if(OopartsCalSumCredit != null) {
          sumCredit.value = OopartsCalSumCredit
        }
        const OopartsCalSavedData = JSON.parse(localStorage.getItem('OopartsCalSavedData'))
        if(OopartsCalSavedData != null) {
          savedData.value = OopartsCalSavedData
        }
      })

      return {
        exBefore,
        exAfter,
        nsBefore,
        nsAfter,
        psBefore,
        psAfter,
        ssBefore,
        ssAfter,
        requireCreditEx,
        requireCreditNs,

        selectCharacters,
        characterLists,
        filterCharacters (val, update) {
          update(() => {
            const needle = hiraToKana(val)
            characterLists.value = characterJson.value.filter(v => hiraToKana(v.name).indexOf(needle) > -1)
          })
        },
        setSelectCharacters (val) {
          selectCharacters.value = val
        },

        calresultTitle,

        credit : computed(() => {
          let creditResult = 0;
          if (exBefore.value < exAfter.value) {
            for (let i = exBefore.value; i < exAfter.value; i++) {
              creditResult += requireCreditEx[i]
            }
          }
          if (nsBefore.value < nsAfter.value) {
            for (let i = nsBefore.value; i < nsAfter.value; i++) {
              creditResult += requireCreditNs[i]
            }
          }
          if (psBefore.value < psAfter.value) {
            for (let i = psBefore.value; i < psAfter.value; i++) {
              creditResult += requireCreditNs[i]
            }
          }
          if (ssBefore.value < ssAfter.value) {
            for (let i = ssBefore.value; i < ssAfter.value; i++) {
              creditResult += requireCreditNs[i]
            }
          }
          return creditResult.toLocaleString()
        }),

        calCount,

        calresult : computed(() => {
          if(calCount.value < 0) {
            return //これに意味はない。これがないとsaveBtnやdeleteBtnがバグるから無理矢理の対応。マジでなんでなん？
          }
          const findCharacterId = characterJson.value.find((v) => v.name == selectCharacters.value)
          if (findCharacterId !== undefined) {
            const rows = []
            let bd = [0,0,0,0]
            let note = [0,0,0,0]
            const requireData = reqCharacterJson.value[findCharacterId.id]
            Object.keys(requireData).forEach(function (key) {
              const amount = [0,0,0,0,0]
              //ex
              if (exBefore.value < exAfter.value) {
                for (let i = exBefore.value; i < exAfter.value; i++) {
                  amount[requireData[key]['ex'+i].rarity] += requireData[key]['ex'+i].amount
                }
              }
              //ns
              if (nsBefore.value < nsAfter.value) {
                for (let i = nsBefore.value; i < nsAfter.value; i++) {
                  if (requireData[key]['ns'+i] === undefined) { continue }
                  amount[requireData[key]['ns'+i].rarity] += requireData[key]['ns'+i].amount
                }
              }
              //ps
              if (psBefore.value < psAfter.value) {
                for (let i = psBefore.value; i < psAfter.value; i++) {
                  if (requireData[key]['ns'+i] === undefined) { continue }
                  amount[requireData[key]['ns'+i].rarity] += requireData[key]['ns'+i].amount
                }
              }
              //ss
              if (ssBefore.value < ssAfter.value) {
                for (let i = ssBefore.value; i < ssAfter.value; i++) {
                  if (requireData[key]['ns'+i] === undefined) { continue }
                  amount[requireData[key]['ns'+i].rarity] += requireData[key]['ns'+i].amount
                }
              }
              const row = {
                name: requireData[key].oopart.name,
                white: amount[1],
                blue: amount[2],
                orange: amount[3],
                purple: amount[4],
              }
              rows.push(row)
            });

            if (exBefore.value < exAfter.value) {
              for (let i = exBefore.value; i < exAfter.value; i++) {
                for (let j = 0; j < 4; j++) {
                  bd[j] += requireBd[i][j]
                }
              }
            }
            const school_id = requireData[0].character.school
            rows.push({
              name: school[school_id]+'BD',
              white: bd[0],
              blue: bd[1],
              orange: bd[2],
              purple: bd[3],
            })

            if (nsBefore.value < nsAfter.value) {
              for (let i = nsBefore.value; i < nsAfter.value; i++) {
                for (let j = 0; j < 4; j++) {
                  note[j] += requireNote[i][j]
                }
              }
            }
            if (psBefore.value < psAfter.value) {
              for (let i = psBefore.value; i < psAfter.value; i++) {
                for (let j = 0; j < 4; j++) {
                  note[j] += requireNote[i][j]
                }
              }
            }
            if (ssBefore.value < ssAfter.value) {
              for (let i = ssBefore.value; i < ssAfter.value; i++) {
                for (let j = 0; j < 4; j++) {
                  note[j] += requireNote[i][j]
                }
              }
            }
            rows.push({
              name: school[school_id]+'ノート',
              white: note[0],
              blue: note[1],
              orange: note[2],
              purple: note[3],
            })
            return rows
          } else {
            return findCharacterId
          }
        }),
        
        school,

        findCharacterId : computed(() => {
          const findCharacterId = characterJson.value.find((v) => v.name == selectCharacters.value)
          return findCharacterId
        }),

        pagination: {
          page: 1,
          rowsPerPage: 0
        },
        
        loading,
        savedData,
        sumCredit,
        sumData,
        saveBtn: function (calresult, credit) {
          calCount.value++
          if (selectCharacters.value != undefined) {
            const findCharacterId = characterJson.value.find((v) => v.name == selectCharacters.value)
            loading.value = true
            for (let i=0; i<calresult.length; i++) {
              let index = getIndex(calresult[i].name, sumData.value, 'name')
              if (index == undefined) {
                sumData.value.push(calresult[i])
              } else {
                sumData.value[index].white += calresult[i].white
                sumData.value[index].blue += calresult[i].blue
                sumData.value[index].orange += calresult[i].orange
                sumData.value[index].purple += calresult[i].purple
              }
            }
            sumCredit.value = parseInt(sumCredit.value.replace(/,/g, ''),10) + parseInt(credit.replace(/,/g, ''),10)
            sumCredit.value = sumCredit.value.toLocaleString()
            savedData.value.push (JSON.parse(JSON.stringify({
              character: findCharacterId,
              calresult: calresult,
              credit: credit,
              exBefore: exBefore.value,
              exAfter: exAfter.value,
              nsBefore: nsBefore.value,
              nsAfter: nsAfter.value,
              psBefore: psBefore.value,
              psAfter: psAfter.value,
              ssBefore: ssBefore.value,
              ssAfter: ssAfter.value, 
            })))
            localStorage.setItem('OopartsCalSavedData', JSON.stringify(savedData.value))
            localStorage.setItem('OopartsCalSumData', JSON.stringify(sumData.value))
            localStorage.setItem('OopartsCalSumCredit', JSON.stringify(sumCredit.value))
          }
          setTimeout(() => {
            loading.value = false
          }, 1000)
        },

        deleteBtn: function (key) {
          calCount.value++
          let deleteList = []
          const calresult = savedData.value[key].calresult
          for (let i=0; i<calresult.length; i++) {
            let index = getIndex(calresult[i].name, sumData.value, 'name')
            sumData.value[index].white -= calresult[i].white
            sumData.value[index].blue -= calresult[i].blue
            sumData.value[index].orange -= calresult[i].orange
            sumData.value[index].purple -= calresult[i].purple
          }
          for (let i=0; i<sumData.value.length; i++) {
            if (
              sumData.value[i].white == 0 &&
              sumData.value[i].blue == 0 &&
              sumData.value[i].orange == 0 &&
              sumData.value[i].purple == 0
            ) {
              deleteList.push(i)
            }
          }
          deleteList.reverse()
          deleteList.forEach(function(e) {
            sumData.value.splice(e, 1)
          })

          sumCredit.value = parseInt(sumCredit.value.replace(/,/g, ''),10) - parseInt(savedData.value[key].credit.replace(/,/g, ''),10)
          sumCredit.value = sumCredit.value.toLocaleString()
          savedData.value.splice(key, 1)

          localStorage.setItem('OopartsCalSavedData', JSON.stringify(savedData.value))
          localStorage.setItem('OopartsCalSumData', JSON.stringify(sumData.value))
          localStorage.setItem('OopartsCalSumCredit', JSON.stringify(sumCredit.value))
        }
      }
    }
  }
</script>