'use strict';

import config from './gulp.config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

import connect from 'gulp-connect';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';

import postcss from 'gulp-postcss';
import precss from 'precss';
import cssnano from 'cssnano';
import rucksack from 'rucksack-css';
import colorblind from 'postcss-colorblind';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssCustomProperties from 'postcss-custom-properties';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/**
 * tasks
 */

// task css
function css(isColorblind) {
  let processors = [precss(), postcssPresetEnv(), rucksack(), postcssCustomSelectors(), postcssCustomProperties(), cssnano()];

  if (isColorblind) processors.push(colorblind());

  return gulp
    .src(`${config.src.css.root}/*.css`)
    .pipe(plumber())
    .pipe(postcss(processors))
    .on('error', handleError)
    .pipe(gulp.dest(config.public.css))
    .pipe(connect.reload());
}

// default task
gulp.task('default', () => {
  // create local server
  connect.server(config.connect);

  // watch all css files
  gulp.watch(`${config.src.css.root}/**/*.css`).on('change', fileName => {
    css(fileName.includes('colorblind'));
  });
});
