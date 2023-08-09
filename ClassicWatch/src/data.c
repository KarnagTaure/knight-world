/*
 * Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 * Licensed under the Flora License, Version 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://floralicense.org/license/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <app_common.h>
#include <Elementary.h>
#include <efl_extension.h>
#include <dlog.h>

#include "classicwatch.h"
#include "data.h"

#define IMAGE_HANDS_SEC "images/lux_3_hands_sec.png"
#define IMAGE_HANDS_MIN "images/lux_3_hands_min.png"
#define IMAGE_HANDS_HOUR "images/lux_3_hands_hr.png"
#define IMAGE_HANDS_MODULE_CALENDAR "images/lux_3_hands_module_calendar.png"
#define IMAGE_HANDS_SEC_SHADOW "images/lux_3_hands_sec_shadow.png"
#define IMAGE_HANDS_MIN_SHADOW "images/lux_3_hands_min_shadow.png"
#define IMAGE_HANDS_HOUR_SHADOW "images/lux_3_hands_hr_shadow.png"
#define IMAGE_HANDS_MODULE_CALENDAR_SHADOW "images/lux_3_hands_module_calendar_shadow.png"

#define MINIMUM_DAY_DIFFERENCE 32

typedef struct _date_info {
	int year;
	int month;
	int day;
} date_info_s;

/**
 * Moon phase stamp of next five years.
 * Sets only phase stamp.
 */
date_info_s moon_phase_data[5][52] = {
	/*
	 * 2016 data set.
	 * first phase stamp is "Last Quarter".
	 */
	{
		{ 2015, 12, 25},
		{ 2016, 1, 2 }, { 2016, 1, 10 }, { 2016, 1, 16 }, { 2016, 1, 24 },
		{ 2016, 2, 1 }, { 2016, 2, 8 }, { 2016, 2, 15 }, { 2016, 2, 22 },
		{ 2016, 3, 1 }, { 2016, 3, 9 }, { 2016, 3, 15 }, { 2016, 3, 23 }, { 2016, 3, 31 },
		{ 2016, 4, 7 }, { 2016, 4, 14 }, { 2016, 4, 22 }, { 2016, 4, 30 },
		{ 2016, 5, 6 }, { 2016, 5, 13 }, { 2016, 5, 21 }, { 2016, 5, 29 },
		{ 2016, 6, 5 }, { 2016, 6, 12 }, { 2016, 6, 20 }, { 2016, 6, 27 },
		{ 2016, 7, 4 }, { 2016, 7, 12 }, { 2016, 7, 19 }, { 2016, 7, 26 },
		{ 2016, 8, 2 }, { 2016, 8, 10 }, { 2016, 8, 18 }, { 2016, 8, 25 },
		{ 2016, 9, 1 }, { 2016, 9, 9 }, { 2016, 9, 16 }, { 2016, 9, 23 },
		{ 2016, 10, 1 }, { 2016, 10, 9 }, { 2016, 10, 16 }, { 2016, 10, 22 }, { 2016, 10, 30 },
		{ 2016, 11, 7 }, { 2016, 11, 14 }, { 2016, 11, 21 }, { 2016, 11, 29 },
		{ 2016, 12, 7 }, { 2016, 12, 14 }, { 2016, 12, 21 }, { 2016, 12, 29 },
		{ 2017, 1, 5}
	},

	/*
	 * 2017 data set.
	 * first phase stamp is "First Quarter".
	 */
	{
		{ 2016, 12, 29 },
		{ 2017, 1, 5 }, { 2017, 1, 12 }, { 2017, 1, 19 }, { 2017, 1, 28 },
		{ 2017, 2, 4 }, { 2017, 2, 11 }, { 2017, 2, 18 }, { 2017, 2, 26 },
		{ 2017, 3, 5 }, { 2017, 3, 12 }, { 2017, 3, 20 }, { 2017, 3, 28 },
		{ 2017, 4, 3 }, { 2017, 4, 11 }, { 2017, 4, 19 }, { 2017, 4, 26 },
		{ 2017, 5, 3 }, { 2017, 5, 10 }, { 2017, 5, 19 }, { 2017, 5, 25 },
		{ 2017, 6, 1 }, { 2017, 6, 9 }, { 2017, 6, 17 }, { 2017, 6, 24 },
		{ 2017, 7, 1 }, { 2017, 7, 9 }, { 2017, 7, 16 }, { 2017, 7, 23 }, { 2017, 7, 30 },
		{ 2017, 8, 7 }, { 2017, 8, 15 }, { 2017, 8, 21 }, { 2017, 8, 29 },
		{ 2017, 9, 6 }, { 2017, 9, 13 }, { 2017, 9, 20 }, { 2017, 9, 28 },
		{ 2017, 10, 5 }, { 2017, 10, 12 }, { 2017, 10, 19 }, { 2017, 10, 27 },
		{ 2017, 11, 4 }, { 2017, 11, 10 }, { 2017, 11, 18 }, { 2017, 11, 26 },
		{ 2017, 12, 3 }, { 2017, 12, 10 }, { 2017, 12, 18 }, { 2017, 12, 26 },
		{ 2018,  1, 2 }, { 2018, 1, 8 }
	},

	/*
	 * 2018 data set.
	 * first phase stamp is "Full Moon".
	 */
	{
		{ 2017, 12, 26 },
		{ 2018, 1, 2 }, { 2018, 1, 8 }, { 2018, 1, 17 }, { 2018, 1, 24 }, { 2018, 1, 31 },
		{ 2018, 2, 7 }, { 2018, 2, 15 }, { 2018, 2, 23 },
		{ 2018, 3, 2 }, { 2018, 3, 9 }, { 2018, 3, 17 }, { 2018, 3, 24 }, { 2018, 3, 31 },
		{ 2018, 4, 8 }, { 2018, 4, 16 }, { 2018, 4, 22 }, { 2018, 4, 30 },
		{ 2018, 5, 8 }, { 2018, 5, 15 }, { 2018, 5, 22 }, { 2018, 5, 29 },
		{ 2018, 6, 6 }, { 2018, 6, 13 }, { 2018, 6, 20 }, { 2018, 6, 28 },
		{ 2018, 7, 6 }, { 2018, 7, 13 }, { 2018, 7, 19 }, { 2018, 7, 27 },
		{ 2018, 8, 4 }, { 2018, 8, 11 }, { 2018, 8, 18 }, { 2018, 8, 26 },
		{ 2018, 9, 3 }, { 2018, 9, 9 }, { 2018, 9, 16}, { 2018, 9, 25 },
		{ 2018, 10, 2 }, { 2018, 10, 9 }, { 2018, 10, 16 }, { 2018, 10, 24 }, { 2018, 10, 31 },
		{ 2018, 11, 7 }, { 2018, 11, 15 }, { 2018, 11, 23 }, { 2018, 11, 30 },
		{ 2018, 12, 7 }, { 2018, 12, 15 }, { 2018, 12, 22 }, { 2018, 12, 29 },
		{ 2019, 1, 6 }
	},

	/*
	 * 2019 data set.
	 * first phase stamp is "New Moon".
	 */
	{
		{ 2018, 12, 29 },
		{ 2019, 1, 6 }, { 2019, 1, 14 }, { 2019, 1, 21 }, { 2019, 1, 27 },
		{ 2019, 2, 4 }, { 2019, 2, 12 }, { 2019, 2, 19 }, { 2019, 2, 26 },
		{ 2019, 3, 6 }, { 2019, 3, 14 }, { 2019, 3, 21 }, { 2019, 3, 28 },
		{ 2019, 4, 5 }, { 2019, 4, 12 }, { 2019, 4, 19 }, { 2019, 4, 26 },
		{ 2019, 5, 4 }, { 2019, 5, 12 }, { 2019, 5, 18 }, { 2019, 5, 26 },
		{ 2019, 6, 3 }, { 2019, 6, 10 }, { 2019, 6, 17 }, { 2019, 6, 25 },
		{ 2019, 7, 2 }, { 2019, 7, 9 }, { 2019, 7, 16 }, { 2019, 7, 25 },
		{ 2019, 8, 1 }, { 2019, 8, 7 }, { 2019, 8, 15 }, { 2019, 8, 23 }, { 2019, 8, 30 },
		{ 2019, 9, 6 }, { 2019, 9, 14 }, { 2019, 9, 22 }, { 2019, 9, 28},
		{ 2019, 10, 5 }, { 2019, 10, 13 }, { 2019, 10, 21 }, { 2019, 10, 28 },
		{ 2019, 11, 4 }, { 2019, 11, 12 }, { 2019, 11, 19 }, { 2019, 11, 26 },
		{ 2019, 12, 4 }, { 2019, 12, 12 }, { 2019, 12, 19 }, { 2019, 12, 26 },
		{ 2020, 1, 3 }, { 2020, 1, 10 }
	},

	/*
	 * 2020 data set.
	 * first phase stamp is "First Quarter".
	 */
	{
		{ 2019, 12, 26 },
		{ 2020, 1, 3 }, { 2020, 1, 10 }, { 2020, 1, 17 }, { 2020, 1, 24 },
		{ 2020, 2, 2 }, { 2020, 2, 9 }, { 2020, 2, 15 }, { 2020, 2, 23 },
		{ 2020, 3, 2 }, { 2020, 3, 9 }, { 2020, 3, 16 }, { 2020, 3, 24 },
		{ 2020, 4, 1 }, { 2020, 4, 8 }, { 2020, 4, 14 }, { 2020, 4, 23 }, { 2020, 4, 30 },
		{ 2020, 5, 7 }, { 2020, 5, 14 }, { 2020, 5, 22 }, { 2020, 5, 30 },
		{ 2020, 6, 5 }, { 2020, 6, 13 }, { 2020, 6, 21 }, { 2020, 6, 28 },
		{ 2020, 7, 5 }, { 2020, 7, 12 }, { 2020, 7, 20 }, { 2020, 7, 27 },
		{ 2020, 8, 3 }, { 2020, 8, 11 }, { 2020, 8, 19 }, { 2020, 8, 25 },
		{ 2020, 9, 2 }, { 2020, 9, 10 }, { 2020, 9, 17 }, { 2020, 9, 24 },
		{ 2020, 10, 1 }, { 2020, 10, 10 }, { 2020, 10, 16 }, { 2020, 10, 23 }, { 2020, 10, 31 },
		{ 2020, 11, 8 }, { 2020, 11, 15 }, { 2020, 11, 22 }, { 2020, 11, 30 },
		{ 2020, 12, 8 }, { 2020, 12, 14 }, { 2020, 12, 21 }, { 2020, 12, 30 },
		{ 2021, 1, 6}
	},
};

/**
 * For each year, set first stamp. (2016 ~ 2020)
 * 0 : New Moon
 * 1 : First Quarter
 * 2 : Full Moon
 * 3 : Last Quarter
 */
static int moon_phase_first_angle[5] = { 3, 1, 2, 0, 1 };

/**
 * @brief Get path of resource.
 * @param[in] file_in File name
 * @param[out] file_path_out The point to which save full path of the resource
 * @param[in] file_path_max Size of file name include path
 */
void data_get_resource_path(const char *file_in, char *file_path_out, int file_path_max)
{
	char *res_path = app_get_resource_path();
	if (res_path) {
		snprintf(file_path_out, file_path_max, "%s%s", res_path, file_in);
		free(res_path);
	}
}

/**
 * @brief Initialization function for data module.
 */
void data_initialize(void)
{
	/*
	 * If you need to initialize managing data,
	 * please use this function.
	 */
}

/**
 * @brief Finalization function for data module.
 */
void data_finalize(void)
{
	/*
	 * If you need to finalize managing data,
	 * please use this function.
	 */
}

/**
 * @brief Get plus angle for the hour hand.
 * @param[in] minute Current minute
 */
int data_get_plus_angle(int minute)
{
	int angle = 0;

	if (minute >= 0 && minute < 12) {
		angle = 0;
	} if (minute >= 12 && minute < 24) {
		angle = 6;
	} else if (minute >= 24 && minute < 36) {
		angle = 12;
	} else if (minute >= 36 && minute < 48) {
		angle = 18;
	} else if (minute >= 48 && minute < 60) {
		angle = 24;
	}

	return angle;
}

/**
 * @brief Get a image path of the part.
 * @param[in] type The part type
 */
char *data_get_parts_image_path(parts_type_e type)
{
	char image_path[PATH_MAX] = { 0, };
	char *resource_image = NULL;

	switch (type) {
	case PARTS_TYPE_HANDS_SEC:
		resource_image = IMAGE_HANDS_SEC;
		break;
	case PARTS_TYPE_HANDS_MIN:
		resource_image = IMAGE_HANDS_MIN;
		break;
	case PARTS_TYPE_HANDS_HOUR:
		resource_image = IMAGE_HANDS_HOUR;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY:
		resource_image = IMAGE_HANDS_MODULE_CALENDAR;
		break;
	case PARTS_TYPE_HANDS_SEC_SHADOW:
		resource_image = IMAGE_HANDS_SEC_SHADOW;
		break;
	case PARTS_TYPE_HANDS_MIN_SHADOW:
		resource_image = IMAGE_HANDS_MIN_SHADOW;
		break;
	case PARTS_TYPE_HANDS_HOUR_SHADOW:
		resource_image = IMAGE_HANDS_HOUR_SHADOW;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW:
		resource_image = IMAGE_HANDS_MODULE_CALENDAR_SHADOW;
		break;
	default:
		dlog_print(DLOG_ERROR, LOG_TAG, "type error : %d", type);
		return NULL;
	}

	data_get_resource_path(resource_image, image_path, sizeof(image_path));

	return strdup(image_path);
}

/**
 * @brief Get a position of the part.
 * @param[in] type The part type
 * @param[out] x The pointer to an integer in which to store the X coordinate of the part
 * @param[out] y The pointer to an integer in which to store the Y coordinate of the part
 */
void data_get_parts_position(parts_type_e type, int *x, int *y)
{
	switch (type) {
	case PARTS_TYPE_HANDS_SEC:
		*x = (BASE_WIDTH / 2) - (HANDS_SEC_WIDTH / 2);
		*y = 0;
		break;
	case PARTS_TYPE_HANDS_MIN:
		*x = (BASE_WIDTH / 2) - (HANDS_MIN_WIDTH / 2);
		*y = 0;
		break;
	case PARTS_TYPE_HANDS_HOUR:
		*x = (BASE_WIDTH / 2) - (HANDS_HOUR_WIDTH / 2);
		*y = 0;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH:
		*x = (BASE_WIDTH / 2) - HANDS_MODULE_CALENDAR_WIDTH - 54;
		*y = 175;
		break;
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY:
		*x = (BASE_WIDTH / 2) + 54;
		*y = 175;
		break;
	case PARTS_TYPE_HANDS_SEC_SHADOW:
		*x =  (BASE_WIDTH / 2) - (HANDS_SEC_WIDTH / 2);
		*y = HANDS_SEC_SHADOW_PADDING;
		break;
	case PARTS_TYPE_HANDS_MIN_SHADOW:
		*x = (BASE_WIDTH / 2) - (HANDS_MIN_WIDTH / 2);
		*y = HANDS_MIN_SHADOW_PADDING;
		break;
	case PARTS_TYPE_HANDS_HOUR_SHADOW:
		*x = (BASE_WIDTH / 2) - (HANDS_HOUR_WIDTH / 2);
		*y = HANDS_HOUR_SHADOW_PADDING;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW:
		*x = (BASE_WIDTH / 2) - HANDS_MODULE_CALENDAR_WIDTH - 54;
		*y = 175 + HANDS_MODULE_CALENDAR_PADDING;
		break;
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW:
		*x = (BASE_WIDTH / 2) + 54;
		*y = 175 + HANDS_MODULE_CALENDAR_PADDING;
		break;
	default:
		dlog_print(DLOG_ERROR, LOG_TAG, "type error : %d", type);
		break;
	}

}

/**
 * @brief Get a width size of the part.
 * @param[in] type The part type
 */
int data_get_parts_width_size(parts_type_e type)
{
	int parts_width = 0;

	switch (type) {
	case PARTS_TYPE_HANDS_SEC:
	case PARTS_TYPE_HANDS_SEC_SHADOW:
		parts_width = HANDS_SEC_WIDTH;
		break;
	case PARTS_TYPE_HANDS_MIN:
	case PARTS_TYPE_HANDS_MIN_SHADOW:
		parts_width = HANDS_MIN_WIDTH;
		break;
	case PARTS_TYPE_HANDS_HOUR:
	case PARTS_TYPE_HANDS_HOUR_SHADOW:
		parts_width = HANDS_HOUR_WIDTH;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH:
	case PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW:
		parts_width = HANDS_MODULE_CALENDAR_WIDTH;
		break;
	default:
		dlog_print(DLOG_ERROR, LOG_TAG, "type error : %d", type);
		break;
	}

	return parts_width;
}

/**
 * @brief Get a height size of the part.
 * @param[in] type The part type
 */
int data_get_parts_height_size(parts_type_e type)
{
	int parts_height = 0;

	switch (type) {
	case PARTS_TYPE_HANDS_SEC:
	case PARTS_TYPE_HANDS_SEC_SHADOW:
		parts_height = HANDS_SEC_HEIGHT;
		break;
	case PARTS_TYPE_HANDS_MIN:
	case PARTS_TYPE_HANDS_MIN_SHADOW:
		parts_height = HANDS_MIN_HEIGHT;
		break;
	case PARTS_TYPE_HANDS_HOUR:
	case PARTS_TYPE_HANDS_HOUR_SHADOW:
		parts_height = HANDS_HOUR_HEIGHT;
		break;
	case PARTS_TYPE_HANDS_MODULE_MONTH:
	case PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY:
	case PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW:
		parts_height = HANDS_MODULE_CALENDAR_HEIGHT;
		break;
	default:
		dlog_print(DLOG_ERROR, LOG_TAG, "type error : %d", type);
		break;
	}

	return parts_height;
}

/**
 * @brief Check whether a leap year.
 * @pram[in] year The year number
 */
static Eina_Bool _check_leap_year(int year)
{
	Eina_Bool ret = EINA_FALSE;

	if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
		ret = EINA_TRUE;
	} else {
		ret = EINA_FALSE;
	}

	return ret;
}

/**
 * @brief Calculates total days.
 * @pram[in] day The day number
 * @pram[in] month The month number
 * @pram[in] year The year number
 */
static int _get_total_days(int day, int month, int year)
{
	Eina_Bool is_leap_year = EINA_FALSE;
	int months[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
	int i = 0;
	long total = 0L;

	total = (year - 1) * 365L + (year - 1) / 4 - (year - 1) / 100 + (year - 1) / 400;

	is_leap_year = _check_leap_year(year);
	if (is_leap_year) {
		months[1]++;
	}

	for (i = 0; i < month - 1; i++) {
		total += months[i];
	}

	total += day;

	return total;
}

/**
 * @brief Calculates rotating angle for moon phase.
 * @pram[in] day The day number
 * @pram[in] month The month number
 * @pram[in] year The year number
 * @pram[in] start_stamp The structure of date info
 * @pram[in] last_stamp The structure of date info
 * @pram[in] current_stamp_num The first moon phase type of this month
 */
static float _calculate_angle(int day, int month, int year, date_info_s start_stamp, date_info_s last_stamp, int current_stamp_num)
{
	Eina_Bool is_leap_year = EINA_FALSE;
	float angle = 0.0f;
	int months[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
	int start_year_month_day = 0;
	int denomi_stamp = 0, number_stamp = 0;

	is_leap_year = _check_leap_year(year);
	if (is_leap_year) {
		months[1]++;
	}

	start_year_month_day = months[start_stamp.month];

	denomi_stamp = _get_total_days(last_stamp.day, last_stamp.month, last_stamp.year) - _get_total_days(start_stamp.day, start_stamp.month, start_stamp.year) + 1;
	number_stamp = _get_total_days(day, month, year) - _get_total_days(start_stamp.day, start_stamp.month, start_stamp.year);

	if (denomi_stamp > MINIMUM_DAY_DIFFERENCE) {
		denomi_stamp = (start_year_month_day - start_stamp.day) + 1 + last_stamp.day;
	}

	if (number_stamp > MINIMUM_DAY_DIFFERENCE) {
		number_stamp = (start_year_month_day - start_stamp.day) + 1 + day;
	}

	if (start_stamp.year == last_stamp.year &&
			start_stamp.month == last_stamp.month &&
			start_stamp.day == last_stamp.day) {
		angle = 45 * current_stamp_num;
	} else {
		angle = ((float) ((float) number_stamp / (float) denomi_stamp) * 45) + 45 * current_stamp_num;
	}

	return angle;
}

/**
 * @brief Get angle of moon phase.
 * @pram[in] day The day number
 * @pram[in] month The month number
 * @pram[in] year The year number
 */
float data_get_moonphase(int day, int month, int year)
{
	date_info_s start_stamp;
	date_info_s last_stamp;
	float angle = 0.0f;
	int year_idx = 0;
	int current_stamp_num = 0;
	int i = 0;

	/*
	 * This watch sample provide moon phase from 2016 to 2020.
	 */
	if (year < 2016 || year > 2020) {
		return 0;
	}

	year_idx = year - 2016;

	/*
	 * Find stamp using current date.
	 */
	for (i = 0; i < 52; i++) {
		if (moon_phase_data[year_idx][i].year == year &&
				moon_phase_data[year_idx][i].month == month &&
				moon_phase_data[year_idx][i].day == day) {
			/*
			 * If stamp date equal to current date, set current stamp to that stamp.
			 */
			start_stamp.year = last_stamp.year = moon_phase_data[year_idx][i].year;
			start_stamp.month = last_stamp.month = moon_phase_data[year_idx][i].month;
			start_stamp.day = last_stamp.day = moon_phase_data[year_idx][i].day;

			current_stamp_num = (moon_phase_first_angle[year_idx] + i - 1) % 4;
			break;
		} else if (((moon_phase_data[year_idx][i].year == year) &&
					(moon_phase_data[year_idx][i].month > month || (moon_phase_data[year_idx][i].month == month && moon_phase_data[year_idx][i].day > day))) ||
				moon_phase_data[year_idx][i].year > year) {

			/*
			 * If that's not it, find the median stamp.
			 */
			start_stamp.year = moon_phase_data[year_idx][i - 1].year;
			start_stamp.month = moon_phase_data[year_idx][i - 1].month;
			start_stamp.day = moon_phase_data[year_idx][i - 1].day;

			last_stamp.year = moon_phase_data[year_idx][i].year;
			last_stamp.month = moon_phase_data[year_idx][i].month;
			last_stamp.day = moon_phase_data[year_idx][i].day;

			current_stamp_num = (moon_phase_first_angle[year_idx] + i + 2) % 4;
			break;
		}
	}

	angle = _calculate_angle(day, month, year, start_stamp, last_stamp, current_stamp_num);

	return (angle + 60.0);
}
