package backend

import (
	"fmt"
	"strconv"
)

type PointData struct {
	ControlValue   int      `json:"controlValue"`
	IterationValue int      `json:"iterationValue"`
	Points         []string `json:"points"`
}

type PointData_Numeric struct {
	ControlValue   int
	IterationValue int
	Points         []Point
}

func Reconvert_PointData(x PointData) PointData_Numeric {
	var temp_Numeric PointData_Numeric
	temp_Numeric.ControlValue = x.ControlValue
	temp_Numeric.IterationValue = x.IterationValue
	for i := 0; i < len(x.Points); i++ {
		if i%2 == 0 {
			var floated_val float64;
			floated_val,_ = strconv.ParseFloat(x.Points[i],64)
			var temp_point Point = Create_Point(floated_val,0)
			temp_Numeric.Points = append(temp_Numeric.Points, temp_point)
		} else {
			var div_num int = i/2
			temp_Numeric.Points[div_num].Y,_ = strconv.ParseFloat(x.Points[i],64)
		}
	}
	return temp_Numeric
}

func Back_Main(x PointData) {
	var new_Point PointData_Numeric = Reconvert_PointData(x)
	fmt.Println(new_Point.ControlValue)
	fmt.Println(new_Point.IterationValue)
	fmt.Println(new_Point.Points)
}