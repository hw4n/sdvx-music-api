/* eslint-disable camelcase */
import { model, Schema, Document } from 'mongoose';

export interface IMusic extends Document {
  info: {
    label: string,
    title_name: string,
    title_yomigana: string,
    artist_name: string,
    artist_yomigana: string,
    ascii: string,
    bpm_max: number,
    bpm_min: number,
    distribution_date: string,
    version: number,
    inf_ver: number,
  },
  difficulty: {
    novice: {
      difnum: number,
      illustrator: String,
      effected_by: String,
    },
    advanced: {
      difnum: Number,
      illustrator: String,
      effected_by: String,
    },
    exhaust: {
      difnum: Number,
      illustrator: String,
      effected_by: String,
    },
    infinite: {
      difnum: Number,
      illustrator: String,
      effected_by: String,
    },
    maximum: {
      difnum: Number,
      illustrator: String,
      effected_by: String,
    },
  },
}

const musicSchema = new Schema({
  info: {
    label: { type: String },
    title_name: { type: String },
    title_yomigana: { type: String },
    artist_name: { type: String },
    artist_yomigana: { type: String },
    ascii: { type: String },
    bpm_max: { type: Number },
    bpm_min: { type: Number },
    distribution_date: { type: String },
    version: { type: Number },
    inf_ver: { type: Number },
  },
  difficulty: {
    novice: {
      difnum: { type: Number },
      illustrator: { type: String },
      effected_by: { type: String },
    },
    advanced: {
      difnum: { type: Number },
      illustrator: { type: String },
      effected_by: { type: String },
    },
    exhaust: {
      difnum: { type: Number },
      illustrator: { type: String },
      effected_by: { type: String },
    },
    infinite: {
      difnum: { type: Number },
      illustrator: { type: String },
      effected_by: { type: String },
    },
    maximum: {
      difnum: { type: Number },
      illustrator: { type: String },
      effected_by: { type: String },
    },
  },
});

export default model<IMusic>('Music', musicSchema);
