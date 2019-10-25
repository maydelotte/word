
let app = new Vue({
  el: '#app',
  data: {
    meaning: '',
    sound: '',
    spelling: '',
    rhyme: '',
    relation: '',
    meaning_word_list: [],
    sound_word_list: [],
    spelling_word_list: [],
    rhyme_word_list: [],
    relation_word_list: [],
    best_word: '',
    max_number: 0,
    dict: {}
  },
  created() {
  },
  computed: {
  },
  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    },
  },
  methods: {
    async findWord() {
      try {

        console.log("Find word triggered");

        // Clear old word stuff
        this.meaning_word_list = [];
        this.sound_word_list = [];
        this.spelling_word_list = [];
        this.rhyme_word_list = [];
        this.relation_word_list = [];
        this.best_word = '';
        this.dict = {};
        this.max_number = 0;

        var temp_max_number = 1;
        var temp_best_word = '';

        var list_length = 50;

        // Get new word stuff
        var baseUrl = "https://api.datamuse.com/words?";
        if (this.meaning != '') {
          const meaning_response = await axios.get(baseUrl + "ml=" + this.meaning);
          this.meaning_word_list = meaning_response.data.slice(0, list_length);
          this.meaning_word_list.forEach( (word, index) => {
            if (!(word.word in this.dict)) {
              this.dict[word.word] = 0;
            }
            this.dict[word.word] += 1;
            if (this.dict[word.word] > temp_max_number) {
              temp_max_number = this.dict[word.word];
              temp_best_word = word.word;
            }
          });
        }
        if (this.sound != '') {
          const sound_response = await axios.get(baseUrl + "sl=" + this.sound);
          this.sound_word_list = sound_response.data.slice(0, list_length);
          this.sound_word_list.forEach( (word, index) => {
            if (!(word.word in this.dict)) {
              this.dict[word.word] = 0;
            }
            this.dict[word.word] += 1;
            if (this.dict[word.word] > temp_max_number) {
              temp_max_number = this.dict[word.word];
              temp_best_word = word.word;
            }
          });
        }
        if (this.spelling != '') {
          const spelling_response = await axios.get(baseUrl + "sp=" + this.spelling);
          this.spelling_word_list = spelling_response.data.slice(0, list_length);
          this.spelling_word_list.forEach( (word, index) => {
            if (!(word.word in this.dict)) {
              this.dict[word.word] = 0;
            }
            this.dict[word.word] += 1;
            if (this.dict[word.word] > temp_max_number) {
              temp_max_number = this.dict[word.word];
              temp_best_word = word.word;
            }
          });
        }
        if (this.rhyme != '') {
          const rhyme_response = await axios.get(baseUrl + "rel_rhy=" + this.rhyme);
          this.rhyme_word_list = rhyme_response.data.slice(0, list_length);
          this.rhyme_word_list.forEach( (word, index) => {
            if (!(word.word in this.dict)) {
              this.dict[word.word] = 0;
            }
            this.dict[word.word] += 1;
            if (this.dict[word.word] > temp_max_number) {
              temp_max_number = this.dict[word.word];
              temp_best_word = word.word;
            }
          });
        }
        if (this.relation != '') {
          const relation_response = await axios.get(baseUrl + "rel_trg=" + this.relation);
          this.relation_word_list = relation_response.data.slice(0, list_length);
          this.relation_word_list.forEach( (word, index) => {
            if (!(word.word in this.dict)) {
              this.dict[word.word] = 0;
            }
            this.dict[word.word] += 1;
            if (this.dict[word.word] > temp_max_number) {
              temp_max_number = this.dict[word.word];
              temp_best_word = word.word;
            }
          });
        }

        if (temp_max_number > 1) {
          this.max_number = temp_max_number;
          this.best_word = temp_best_word;
        }

        console.log(this.max_number);
        console.log(this.best_word);

      } catch (error) {
        console.log(error);
        this.number = this.max;
      }
    },
  }
});
