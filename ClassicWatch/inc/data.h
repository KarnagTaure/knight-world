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

#if !defined(_DATA_H)
#define _DATA_H

typedef enum {
	PARTS_TYPE_HANDS_SEC = 0,
	PARTS_TYPE_HANDS_MIN = 1,
	PARTS_TYPE_HANDS_HOUR = 2,
	PARTS_TYPE_HANDS_MODULE_MONTH = 3,
	PARTS_TYPE_HANDS_MODULE_WEEKDAY = 4,
	PARTS_TYPE_HANDS_SEC_SHADOW = 5,
	PARTS_TYPE_HANDS_MIN_SHADOW = 6,
	PARTS_TYPE_HANDS_HOUR_SHADOW = 7,
	PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW = 8,
	PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW = 9,
	PARTS_TYPE_MAX,
} parts_type_e;

/*
 * Initialize the data component
 */
void data_initialize(void);

/*
 * Finalize the data component
 */
void data_finalize(void);

void data_get_resource_path(const char *file_in, char *file_path_out, int file_path_max);
int data_get_plus_angle(int minute);
char *data_get_parts_image_path(parts_type_e type);
void data_get_parts_position(parts_type_e type, int *x, int *y);
int data_get_parts_width_size(parts_type_e type);
int data_get_parts_height_size(parts_type_e type);

int data_get_juliandate(int day, int month, int year);
float data_get_moonphase(int day, int month, int year);

#endif
