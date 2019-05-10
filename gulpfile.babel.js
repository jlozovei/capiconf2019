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
gulp.task('css:default', () => {
  const processors = [precss(), postcssPresetEnv(), rucksack(), postcssCustomSelectors(), postcssCustomProperties(), cssnano()];

  return gulp
    .src(`${config.src.css.root}/base.css`)
    .pipe(plumber())
    .pipe(postcss(processors))
    .on('error', handleError)
    .pipe(gulp.dest(config.public.css))
    .pipe(connect.reload());
});

gulp.task('css:blind', () => {
  const processors = [
    precss(),
    postcssPresetEnv(),
    rucksack(),
    postcssCustomSelectors(),
    postcssCustomProperties(),
    cssnano(),
    colorblind()
  ];

  return gulp
    .src(`${config.src.css.root}/colorblind.css`)
    .pipe(plumber())
    .pipe(postcss(processors))
    .on('error', handleError)
    .pipe(gulp.dest(config.public.css))
    .pipe(connect.reload());
});

// default task
gulp.task('default', () => {
  // create local server
  connect.server(config.connect);

  // watch all css files
  gulp.watch(`${config.src.css.root}/**/*.css`, gulp.series(['css:default', 'css:blind']));
});
