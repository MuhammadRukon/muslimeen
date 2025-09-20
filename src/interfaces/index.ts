export interface IChapters {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface IVerseResponse {
  verses: IVerse[];
  pagination: IPagination;
}

interface ITafsir {
  id: number;
  language_name: string;
  name: string;
  text: string;
}

interface ITranslation {
  resource_id: number;
  text: string;
}

export interface IWord {
  id: number;
  position: number;
  audio_url: string;
  char_type_name: string;
  text: string;
  line_number: number;
  page_number: number;
  code_v1: string;
  translation: ITranslation;
  text_uthmani: string;
  transliteration: ITransliteration;
}

interface ITransliteration {
  text: string;
  language_name: string;
}

export interface IVerse {
  id: number;
  verse_number: number;
  page_number: number;
  verse_key: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  sajdah_type: string | null;
  sajdah_number: number | null;
  words: IWord[];
  translations: ITranslation[];
  tafsirs: ITafsir[];
}

interface IPagination {
  per_page: number;
  current_page: number;
  next_page: number;
  total_pages: number;
  total_records: number;
}
